import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    ParseIntPipe
} from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController { // <--- Named export fixes ts(2305)
    constructor(private readonly clientsService: ClientsService) { }

    @Get()
    async findAll() {
        return await this.clientsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.clientsService.findOne(id);
    }

    @Post()
    async create(@Body() createClientDto: any) {
        return await this.clientsService.create(createClientDto);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateClientDto: any
    ) {
        return await this.clientsService.update(id, updateClientDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.clientsService.remove(id);
    }
}