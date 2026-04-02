import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { PlantingService } from './planting.service';
import { CreatePlantingDto } from './dto/planting-dto';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserRole } from '@prisma/client';


@Controller('planting')
export class PlantingController {
    constructor(private readonly plantingService: PlantingService) { }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.USER, UserRole.SUPERADMIN)
    @Post()
    create(@Body() dto: CreatePlantingDto, @Request() req) {
        return this.plantingService.create(dto, req.user.id);
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.USER, UserRole.SUPERADMIN)
    @Get()
    findAll(@Request() req) {
        return this.plantingService.findAll(req.user.id);
    }


    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.USER, UserRole.SUPERADMIN)
    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
        return this.plantingService.findOne(+id, req.user.id);
    }
}