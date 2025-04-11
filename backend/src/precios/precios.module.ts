import { Module } from '@nestjs/common';
import { PreciosService } from './precios.service';
import { PreciosController } from './precios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Precio } from './entities/precio.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Precio, Producto]), AuthModule],
  controllers: [PreciosController],
  providers: [PreciosService],
})
export class PreciosModule {}
