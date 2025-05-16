import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriasModule } from './categorias/categorias.module';
import { FormasPagosModule } from './formas_pagos/formas_pagos.module';
import { ProductosModule } from './productos/productos.module';
import { PreciosModule } from './precios/precios.module';
import { VentasModule } from './ventas/ventas.module';
import { VentasDetallesModule } from './ventas_detalles/ventas_detalles.module';
import { PagosModule } from './pagos/pagos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'posmn',
      autoLoadEntities: true,
      synchronize: true, //False en prod
    }),

    UsersModule,
    AuthModule,
    CategoriasModule,
    FormasPagosModule,
    ProductosModule,
    PreciosModule,
    VentasModule,
    VentasDetallesModule,
    PagosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
