import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe
} from '@nestjs/common';
import { GuardsService } from './guards.service';
import { CreateGuardDto } from './dto/create-guard.dto';
import { DeployGuardDto } from './dto/deploy-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';

@Controller('guards')
export class GuardsController {
    constructor(private readonly guardsService: GuardsService) { }

    /**
     * Authorize Deployment
     * Path: PATCH /api/guards/actions/reassign/:id/:postId
     */
    @Patch('actions/reassign/:id/:postId')
    async reassign(
        @Param('id', ParseIntPipe) id: number,
        @Param('postId', ParseIntPipe) postId: number,
        @Body() deployDto: DeployGuardDto,
    ) {
        // Param conversion is now handled by ParseIntPipe for extra safety
        return this.guardsService.reassign(
            id,
            postId,
            deployDto.shift,
            deployDto.startDate
        );
    }

    /**
     * Terminate Assignment
     * Path: DELETE /api/guards/:id/assignment
     */
    @Delete(':id/assignment')
    async unassign(@Param('id', ParseIntPipe) id: number) {
        return this.guardsService.unassign(id);
    }

    /**
     * Create New Guard
     * Path: POST /api/guards
     */
    @Post()
    create(@Body() createGuardDto: CreateGuardDto) {
        return this.guardsService.create(createGuardDto);
    }

    /**
     * Get All Guards
     * Path: GET /api/guards
     */
    @Get()
    findAll() {
        return this.guardsService.findAll();
    }

    /**
     * Get Single Guard by ID
     * Path: GET /api/guards/:id
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.guardsService.findOne(id);
    }

    /**
     * Update Guard Profile
     * Path: PATCH /api/guards/:id
     */
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateGuardDto
    ) {
        return this.guardsService.update(id, dto);
    }

    /**
     * Delete Guard Permanently
     * Path: DELETE /api/guards/:id
     */
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.guardsService.remove(id);
    }
}