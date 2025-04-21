import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserId } from 'src/auth/user.decorator';
import { VentasDetallesService } from 'src/ventas_detalles/ventas_detalles.service';
import { FormasPagosService } from 'src/formas_pagos/formas_pagos.service';

@UseGuards(AuthGuard)
@Controller('ventas')
export class VentasController {
  constructor(
    private readonly ventasService: VentasService,
    @Inject(forwardRef(() => VentasDetallesService))
    private readonly detalleService: VentasDetallesService,
    private readonly formasPagosService: FormasPagosService,
  ) {}

  @Post()
  create(@Body() dto: CreateVentaDto, @UserId() id: number) {
    return this.ventasService.create(id, dto);
  }

  @Get()
  findAll() {
    return this.ventasService.findAll();
  }

  @Get('active')
  findActive() {
    return this.ventasService.findActive();
  }
  @Get('complete')
  findComplete() {
    return this.ventasService.findComplete();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const venta = await this.ventasService.findOne(+id);
    if (!venta) return [];
    const detalle = await this.detalleService.findByVenta(venta.id);

    const formas = await this.formasPagosService.findActive();
    return { venta, detalle, formas };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVentaDto: UpdateVentaDto) {
    return this.ventasService.update(+id, updateVentaDto);
  }

  @Patch('complete/:id')
  complete(@Param('id') id: string) {
    return this.ventasService.completa(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ventasService.eliminada(+id);
  }
}
