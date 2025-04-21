import { IsNumber, IsPositive } from 'class-validator';

export class CreatePagoDto {
  @IsPositive()
  @IsNumber()
  monto: number;
  @IsPositive()
  @IsNumber()
  ventas_id: number;
  @IsPositive()
  @IsNumber()
  formas_pagos_id: number;
}
