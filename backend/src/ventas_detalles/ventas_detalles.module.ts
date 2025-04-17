import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { VentasDetallesService } from './ventas_detalles.service';
import { VentasDetallesController } from './ventas_detalles.controller';
import { VentasDetalle } from './entities/ventas_detalle.entity';
import { VentasModule } from 'src/ventas/ventas.module';
import { AuthModule } from 'src/auth/auth.module';
import { PreciosModule } from 'src/precios/precios.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VentasDetalle]),
    AuthModule,
    PreciosModule,
    UsersModule,
    forwardRef(() => VentasModule),
  ],
  controllers: [VentasDetallesController],
  providers: [VentasDetallesService],
  exports: [VentasDetallesService],
})
export class VentasDetallesModule {}
