import { Module } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pago } from './entities/pago.entity';
import { VentasModule } from 'src/ventas/ventas.module';
import { FormasPagosModule } from 'src/formas_pagos/formas_pagos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pago]), VentasModule, FormasPagosModule],
  controllers: [PagosController],
  providers: [PagosService],
  exports: [PagosService],
})
export class PagosModule {}
