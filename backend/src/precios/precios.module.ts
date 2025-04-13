import { Module } from '@nestjs/common';
import { PreciosService } from './precios.service';
import { PreciosController } from './precios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Precio } from './entities/precio.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CategoriasModule } from 'src/categorias/categorias.module';
//cSpell:ignore categorias, categoria
@Module({
  imports: [
    TypeOrmModule.forFeature([Precio, Producto]),
    AuthModule,
    CategoriasModule,
  ],
  controllers: [PreciosController],
  providers: [PreciosService],
})
export class PreciosModule {}
