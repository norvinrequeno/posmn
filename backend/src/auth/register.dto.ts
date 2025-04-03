import { IsString } from 'class-validator';
import { AuthDto } from './auth.dto';

export class RegisterDto extends AuthDto {
  @IsString({ message: 'Debe agregar un nombre para el usuario' })
  name: string;
}
