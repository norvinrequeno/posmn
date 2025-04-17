import { forwardRef, Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { VentasDetallesModule } from 'src/ventas_detalles/ventas_detalles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Venta]),
    UsersModule,
    AuthModule,
    forwardRef(() => VentasDetallesModule),
  ],
  controllers: [VentasController],
  providers: [VentasService],
  exports: [VentasService],
})
export class VentasModule {}
