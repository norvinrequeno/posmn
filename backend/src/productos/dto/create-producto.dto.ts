import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  producto: string;

  @IsString()
  @IsOptional()
  detalle?: string;

  @IsNumber()
  @IsPositive()
  categorias_id: number;
}
