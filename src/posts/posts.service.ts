import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.services';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.post.findMany({
            include: {
                client: true,
                // Including guards and the guard details + shift info
                guards: {
                    include: { guard: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async create(dto: CreatePostDto) {
        return this.prisma.post.create({
            data: {
                title: dto.title,
                content: dto.content,
                clientId: Number(dto.clientId),
            },
            include: { client: true }
        });
    }

    async update(id: number, dto: UpdatePostDto) {
        try {
            return await this.prisma.post.update({
                where: { id },
                data: dto,
            });
        } catch (error) {
            throw new NotFoundException(`Post #${id} not found`);
        }
    }

    /**
     * UPDATED: addGuard
     * Now accepts an optional shift (defaults to DAY).
     * Enforces that a guard can only be in one place, 
     * but doesn't remove other guards from the post.
     */
    async addGuard(postId: number, guardId: number, shift: string = 'DAY') {
        return this.prisma.$transaction(async (tx) => {
            // 1. Remove this specific guard from any other post assignment
            // This satisfies the @@unique([guardId]) constraint
            await tx.postGuard.deleteMany({ where: { guardId } });

            // 2. Assign the guard to this post with the specific shift
            return tx.postGuard.create({
                data: {
                    postId,
                    guardId,
                    shift
                },
                include: { guard: true }
            });
        });
    }

    /**
     * UPDATED: removeGuard
     * Removes a specific guard assignment. 
     * Since we removed the composite unique key (postId_guardId),
     * we delete by the guardId specifically.
     */
    async removeGuard(guardId: number) {
        return this.prisma.postGuard.deleteMany({
            where: { guardId }
        });
    }

    /**
     * UPDATED: reassignGuards (Bulk Update)
     * If you still use bulk reassignment, this version 
     * clears the site and sets a new batch, defaulting them to DAY shift.
     */
    async reassignGuards(postId: number, guardIds: number[]) {
        return this.prisma.$transaction(async (tx) => {
            // Remove everyone from this specific post
            await tx.postGuard.deleteMany({ where: { postId } });

            if (guardIds.length > 0) {
                // Remove these specific guards from any OTHER posts they were at
                await tx.postGuard.deleteMany({
                    where: { guardId: { in: guardIds } }
                });

                await tx.postGuard.createMany({
                    data: guardIds.map(id => ({
                        postId,
                        guardId: id,
                        shift: 'DAY' // Defaulting bulk assignments to DAY
                    }))
                });
            }
            return tx.post.findUnique({
                where: { id: postId },
                include: { client: true, guards: { include: { guard: true } } }
            });
        });
    }

    async remove(id: number) {
        return this.prisma.post.delete({ where: { id } });
    }
}