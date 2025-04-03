import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail({}, { message: 'El email no es válido' })
  email: string;

  @IsString()
  @MinLength(8, {
    message: 'Las contraseña debe contener al menos 8 caracteres',
  })
  password: string;
}
