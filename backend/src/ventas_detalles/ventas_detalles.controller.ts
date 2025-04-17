import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { VentasDetallesService } from './ventas_detalles.service';
import { CreateVentasDetalleDto } from './dto/create-ventas_detalle.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserId } from 'src/auth/user.decorator';

@UseGuards(AuthGuard)
@Controller('ventas_detalles')
export class VentasDetallesController {
  constructor(private readonly ventasDetallesService: VentasDetallesService) {}

  @Post()
  create(
    @Body() createVentasDetalleDto: CreateVentasDetalleDto,
    @UserId() id: number,
  ) {
    return this.ventasDetallesService.create(id, createVentasDetalleDto);
  }

  @Get(':id')
  findByVenta(@Param('id') id: string) {
    return this.ventasDetallesService.findByVenta(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ventasDetallesService.remove(+id);
  }
}
