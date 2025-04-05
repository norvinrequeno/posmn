import { Module } from '@nestjs/common';
import { FormasPagosService } from './formas_pagos.service';
import { FormasPagosController } from './formas_pagos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormasPago } from './entities/formas_pago.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([FormasPago]), AuthModule],
  controllers: [FormasPagosController],
  providers: [FormasPagosService],
  exports: [FormasPagosService],
})
export class FormasPagosModule {}
