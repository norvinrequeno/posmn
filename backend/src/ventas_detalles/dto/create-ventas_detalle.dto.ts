import { IsNumber, IsPositive } from 'class-validator';

export class CreateVentasDetalleDto {
  @IsNumber()
  @IsPositive()
  cantidad: number;

  @IsNumber()
  @IsPositive()
  precio_id: number;

  @IsNumber()
  @IsPositive()
  ventas_id: number;
}
