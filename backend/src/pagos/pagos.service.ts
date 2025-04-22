import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pago } from './entities/pago.entity';
import { Repository } from 'typeorm';
import { VentasService } from 'src/ventas/ventas.service';
import { FormasPagosService } from 'src/formas_pagos/formas_pagos.service';
import { Venta } from 'src/ventas/entities/venta.entity';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pago) private readonly pagosRepository: Repository<Pago>,
    private readonly ventasService: VentasService,
    private readonly formasPagoService: FormasPagosService,
  ) {}
  async create(dto: CreatePagoDto, venta: Venta): Promise<Pago> {
    const forma = await this.formasPagoService.findOne(dto.formas_pagos_id);
    if (!forma || !forma.estado)
      throw new NotFoundException(
        'La forma de pago no existe o no esta activa',
      );

    const pago = this.pagosRepository.create({
      monto: dto.monto,
      venta,
      forma,
    });
    return this.pagosRepository.save(pago);
  }

  findByVenta(id: number): Promise<Pago[]> {
    return this.pagosRepository.find({
      where: {
        venta: { id },
      },
    });
  }

  async remove(id: number) {
    const pago = await this.pagosRepository.findBy({ id });
    return this.pagosRepository.remove(pago);
  }
}
