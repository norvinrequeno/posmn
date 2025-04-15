import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { VentasDetallesService } from './ventas_detalles.service';
import { VentasDetallesController } from './ventas_detalles.controller';
import { VentasDetalle } from './entities/ventas_detalle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VentasDetalle])],
  controllers: [VentasDetallesController],
  providers: [VentasDetallesService],
})
export class VentasDetallesModule {}
