import { PartialType } from '@nestjs/mapped-types';
import { CreateVentasDetalleDto } from './create-ventas_detalle.dto';

export class UpdateVentasDetalleDto extends PartialType(CreateVentasDetalleDto) {}
