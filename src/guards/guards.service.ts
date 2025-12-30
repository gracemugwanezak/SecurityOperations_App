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
     * Remove a guard from their current post assignment
     */
    async unassign(guardId: number) {
        return this.prisma.postGuard.deleteMany({
            where: { guardId: guardId }
        });
    }

    /**
     * Reassign Logic: Clears old assignments and sets a new one
     */
    async reassign(idParam: number, postId: number) {
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
            // 1. Clear anyone currently assigned to the destination post (ensure 1 guard per post)
            await tx.postGuard.deleteMany({
                where: { postId }
            });

            // 2. Clear this specific guard from any existing assignments
            await tx.postGuard.deleteMany({
                where: { guardId: guard.id }
            });

            // 3. Create the new assignment
            return tx.postGuard.create({
                data: {
                    guardId: guard.id,
                    postId: postId,
                },
                include: {
                    post: { include: { client: true } }
                }
            });
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