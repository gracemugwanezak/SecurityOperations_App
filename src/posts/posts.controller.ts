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

    // New endpoint specifically for the single guard assignment used by the modal
    @Patch(':id/assign')
    async assignGuard(@Param('id', ParseIntPipe) id: number, @Body('guardId') guardId: number) {
        return this.postsService.addGuard(id, guardId);
    }

    @Patch(':id/reassign')
    async reassign(@Param('id', ParseIntPipe) id: number, @Body('guardIds') guardIds: number[]) {
        return this.postsService.reassignGuards(id, guardIds || []);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.remove(id);
    }
}