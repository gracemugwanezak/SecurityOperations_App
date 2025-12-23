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
                guards: { include: { guard: true } }
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

    async reassignGuards(postId: number, guardIds: number[]) {
        return this.prisma.$transaction(async (tx) => {
            await tx.postGuard.deleteMany({ where: { postId } });
            if (guardIds.length > 0) {
                await tx.postGuard.createMany({
                    data: guardIds.map(id => ({ postId, guardId: id }))
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

    async addGuard(postId: number, guardId: number) {
        return this.prisma.$transaction(async (tx) => {
            // First, remove this guard from any other post to ensure they aren't in two places at once
            await tx.postGuard.deleteMany({ where: { guardId } });

            // Then assign them to the new post
            return tx.postGuard.create({
                data: { postId, guardId }
            });
        });
    }

    async removeGuard(postId: number, guardId: number) {
        return this.prisma.postGuard.delete({
            where: { postId_guardId: { postId, guardId } }
        });
    }
}