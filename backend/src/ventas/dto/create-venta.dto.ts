import { IsOptional, IsString } from 'class-validator';

export class CreateVentaDto {
  @IsOptional()
  @IsString()
  titular: string;
}
