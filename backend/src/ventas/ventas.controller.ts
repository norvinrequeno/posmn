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
  NotFoundException,
} from '@nestjs/common';
import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserId } from 'src/auth/user.decorator';
import { VentasDetallesService } from 'src/ventas_detalles/ventas_detalles.service';
import { FormasPagosService } from 'src/formas_pagos/formas_pagos.service';
import { CreatePagoDto } from 'src/pagos/dto/create-pago.dto';
import { PagosService } from 'src/pagos/pagos.service';
import { ReportVentaDto } from './dto/report-venta.dto';

@UseGuards(AuthGuard)
@Controller('ventas')
export class VentasController {
  constructor(
    private readonly ventasService: VentasService,
    @Inject(forwardRef(() => VentasDetallesService))
    private readonly detalleService: VentasDetallesService,
    private readonly formasPagosService: FormasPagosService,
    @Inject(forwardRef(() => PagosService))
    private readonly pagos: PagosService,
  ) {}

  @Post('reporte')
  async report(@Body() dto: ReportVentaDto) {
    const ventas = await this.ventasService.reporte(dto);
    const formas = await this.formasPagosService.findActive();
    return { ventas, formas };
  }
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
  @Get('ticket/:id')
  async ticket(@Param('id') id: string) {
    const venta = await this.ventasService.findOne(+id);
    if (!venta) return [];
    const detalle = await this.detalleService.findByVenta(venta.id);

    const pagos = await this.pagos.findByVenta(venta.id);
    return { venta, detalle, pagos };
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

  @Patch('facturada/:id')
  async facturada(
    @Param('id') id: string,
    @Body() body: { pagos: CreatePagoDto[] },
  ) {
    const venta = await this.ventasService.findOne(+id);
    if (!venta || !venta.estado || venta.facturada)
      throw new NotFoundException('La venta no esta disponible');

    try {
      await Promise.all(body.pagos.map((d) => this.pagos.create(d, venta)));
    } catch (error) {
      console.error(error);
      throw new Error('No se pudo registrar los pagos');
    }
    return await this.ventasService.facturada(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ventasService.eliminada(+id);
  }
}
