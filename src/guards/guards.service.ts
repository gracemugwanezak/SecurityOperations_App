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
     * Updated Reassign Logic
     * Clears both the guard's old position AND the destination's current occupant.
     */
    async reassign(guardId: number, postId: number) {
        return this.prisma.$transaction(async (tx) => {
            // 1. Remove ANYONE currently assigned to the target post
            // This prevents "Unique Constraint" failures if the post is occupied.
            await tx.postGuard.deleteMany({
                where: { postId }
            });

            // 2. Remove this specific guard from any other posts they might be at
            await tx.postGuard.deleteMany({
                where: { guardId }
            });

            // 3. Create new clean assignment
            return tx.postGuard.create({
                data: {
                    guardId,
                    postId,
                },
                include: {
                    post: { include: { client: true } }
                }
            });
        });
    }

    async create(createGuardDto: CreateGuardDto) {
        // Explicitly mapping phoneNumber to ensure it reaches the database
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