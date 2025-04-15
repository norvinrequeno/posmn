import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VentasDetallesService } from './ventas_detalles.service';
import { CreateVentasDetalleDto } from './dto/create-ventas_detalle.dto';
import { UpdateVentasDetalleDto } from './dto/update-ventas_detalle.dto';

@Controller('ventas-detalles')
export class VentasDetallesController {
  constructor(private readonly ventasDetallesService: VentasDetallesService) {}

  @Post()
  create(@Body() createVentasDetalleDto: CreateVentasDetalleDto) {
    return this.ventasDetallesService.create(createVentasDetalleDto);
  }

  @Get()
  findAll() {
    return this.ventasDetallesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ventasDetallesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVentasDetalleDto: UpdateVentasDetalleDto) {
    return this.ventasDetallesService.update(+id, updateVentasDetalleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ventasDetallesService.remove(+id);
  }
}
