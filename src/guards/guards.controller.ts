import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { GuardsService } from './guards.service';
import { CreateGuardDto } from './dto/create-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';

@Controller('guards')
export class GuardsController {
    constructor(private readonly guardsService: GuardsService) { }

    @Patch('actions/reassign/:id/:postId')
    async reassign(
        @Param('id') id: string,
        @Param('postId') postId: string,
    ) {
        const guardIdNum = Number(id);
        const postIdNum = Number(postId);
        return this.guardsService.reassign(guardIdNum, postIdNum);
    }

    // NEW ENDPOINT FOR UNASSIGNING
    @Delete(':id/assignment')
    async unassign(@Param('id', ParseIntPipe) id: number) {
        return this.guardsService.unassign(id);
    }

    @Post()
    create(@Body() createGuardDto: CreateGuardDto) {
        return this.guardsService.create(createGuardDto);
    }

    @Get()
    findAll() {
        return this.guardsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.guardsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateGuardDto) {
        return this.guardsService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.guardsService.remove(id);
    }
}