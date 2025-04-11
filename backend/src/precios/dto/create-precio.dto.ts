import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreatePrecioDto {
  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio solo debe contener 2 decimales' },
  )
  @IsPositive({ message: 'El precio debe ser mayor a 0' })
  precio: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  producto_id: number;

  @IsString()
  @IsOptional()
  detalle: string;
}
