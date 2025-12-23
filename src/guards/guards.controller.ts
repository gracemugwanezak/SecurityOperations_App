import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { GuardsService } from './guards.service';
import { CreateGuardDto } from './dto/create-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';

@Controller('guards')
export class GuardsController {
    constructor(private readonly guardsService: GuardsService) { }

    // 1. CREATE NEW GUARD
    @Post()
    create(@Body() createGuardDto: CreateGuardDto) {
        return this.guardsService.create(createGuardDto);
    }

    // 2. GET ALL GUARDS (For your Square Card Grid)
    @Get()
    findAll() {
        return this.guardsService.findAll();
    }

    // 3. GET ONE SPECIFIC GUARD
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.guardsService.findOne(id);
    }

    // 4. UPDATE GUARD INFO
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateGuardDto: UpdateGuardDto
    ) {
        return this.guardsService.update(id, updateGuardDto);
    }

    // 5. REMOVE GUARD FROM SYSTEM
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.guardsService.remove(id);
    }
}