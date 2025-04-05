import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFormasPagoDto {
  @IsString()
  @IsNotEmpty()
  forma: string;
}
