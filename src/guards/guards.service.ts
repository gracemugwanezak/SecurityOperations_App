import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.services';
import { CreateGuardDto } from './dto/create-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';

@Injectable()
export class GuardsService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.guard.findMany({
            include: {
                posts: {
                    include: {
                        post: { include: { client: true } }
                    }
                }
            }
        });
    }

    async findOne(id: number) {
        const guard = await this.prisma.guard.findUnique({
            where: { id },
            include: {
                posts: {
                    include: {
                        post: { include: { client: true } }
                    }
                }
            }
        });
        if (!guard) throw new NotFoundException(`Guard with ID ${id} not found`);
        return guard;
    }

    /**
     * Reassign Logic: Multi-Guard / Shift-Aware
     * Moves a specific guard to a post/shift.
     * Enforces the rule that a guard can only have ONE active deployment.
     */
    async reassign(idParam: number, postId: number, shift: string, startDate?: string) {
        // 1. Find the guard by Database ID or National ID
        const guard = await this.prisma.guard.findFirst({
            where: {
                OR: [
                    { id: idParam },
                    { idNumber: idParam.toString() }
                ]
            }
        });

        if (!guard) {
            throw new NotFoundException(`Guard not found with ID or National ID: ${idParam}`);
        }

        return this.prisma.$transaction(async (tx) => {
            // 2. Clear THIS SPECIFIC guard from any current assignment
            // (Database constraint @@unique([guardId]) ensures they only have one)
            await tx.postGuard.deleteMany({
                where: { guardId: guard.id }
            });

            // 3. Create the new assignment for this guard
            return tx.postGuard.create({
                data: {
                    guardId: guard.id,
                    postId: postId,
                    shift: shift,
                    assignedAt: startDate ? new Date(startDate) : new Date(),
                },
                include: {
                    post: { include: { client: true } },
                    guard: true
                }
            });
        });
    }

    /**
     * Remove a guard from their current post assignment
     */
    async unassign(guardId: number) {
        return this.prisma.postGuard.deleteMany({
            where: { guardId: guardId }
        });
    }

    async create(createGuardDto: CreateGuardDto) {
        return this.prisma.guard.create({
            data: {
                name: createGuardDto.name,
                idNumber: createGuardDto.idNumber,
                phoneNumber: createGuardDto.phoneNumber,
                homeResidence: createGuardDto.homeResidence,
            },
        });
    }

    async update(id: number, updateGuardDto: UpdateGuardDto) {
        return this.prisma.guard.update({
            where: { id },
            data: updateGuardDto,
        });
    }

    async remove(id: number) {
        return this.prisma.guard.delete({ where: { id } });
    }
}