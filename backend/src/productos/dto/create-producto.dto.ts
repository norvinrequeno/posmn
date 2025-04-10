import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  producto: string;

  @IsString()
  @IsOptional()
  detalle?: string;

  @IsNotEmpty()
  categorias_id: number;
}
