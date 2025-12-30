import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) { }

    @Get()
    findAll() {
        return this.postsService.findAll();
    }

    @Post()
    create(@Body() dto: CreatePostDto) {
        return this.postsService.create(dto);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePostDto) {
        return this.postsService.update(id, dto);
    }

    /**
     * UPDATED: Assign Guard to Post
     * Accepts guardId and shift (DAY/NIGHT) from the body.
     */
    @Patch(':id/assign')
    async assignGuard(
        @Param('id', ParseIntPipe) id: number,
        @Body('guardId') guardId: number,
        @Body('shift') shift: string // New: Capture shift from request
    ) {
        // We pass the shift to the service, defaulting to 'DAY' if not provided
        return this.postsService.addGuard(id, guardId, shift || 'DAY');
    }

    /**
     * UPDATED: Bulk Reassign
     * Note: This usually clears the site and adds a new list.
     */
    @Patch(':id/reassign')
    async reassign(@Param('id', ParseIntPipe) id: number, @Body('guardIds') guardIds: number[]) {
        return this.postsService.reassignGuards(id, guardIds || []);
    }

    /**
     * NEW: Remove a specific guard from an assignment
     * Useful for the "Quick Unassign" feature.
     */
    @Delete('assignments/:guardId')
    async unassignGuard(@Param('guardId', ParseIntPipe) guardId: number) {
        return this.postsService.removeGuard(guardId);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.remove(id);
    }
}