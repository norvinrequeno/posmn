import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ReportVentaDto {
  @IsString()
  @IsNotEmpty()
  inicio: string;

  @IsString()
  @IsOptional()
  fin?: string;
}
