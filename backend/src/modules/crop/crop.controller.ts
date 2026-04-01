import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CropService } from './crop.service';
import { AnalyzeCropDto } from './dto/analyze-crop.dto';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserRole } from '@prisma/client';

@Controller('crop')
export class CropController {
    constructor(private cropService: CropService) { }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.USER, UserRole.SUPERADMIN)
    @Post('analyze')
    async analyze(@Body() dto: AnalyzeCropDto) {
        const result = await this.cropService.analyzePlant(dto);
        return { success: true, data: result };
    }
}