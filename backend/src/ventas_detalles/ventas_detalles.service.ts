import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVentasDetalleDto } from './dto/create-ventas_detalle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VentasDetalle } from './entities/ventas_detalle.entity';
import { Repository } from 'typeorm';
import { VentasService } from 'src/ventas/ventas.service';
import { PreciosService } from 'src/precios/precios.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class VentasDetallesService {
  constructor(
    @InjectRepository(VentasDetalle)
    private readonly detalleRepository: Repository<VentasDetalle>,
    @Inject(forwardRef(() => VentasService))
    private readonly ventasService: VentasService,
    private readonly preciosService: PreciosService,
    private readonly usersService: UsersService,
  ) {}
  async create(
    user_id: number,
    dto: CreateVentasDetalleDto,
  ): Promise<VentasDetalle> {
    const user = await this.usersService.findOne(user_id);
    if (!user)
      throw new NotFoundException(
        'Usuario no encontrado, revise si tiene una sesión valida',
      );

    const venta = await this.ventasService.findOne(+dto.ventas_id);
    if (!venta || venta.completa || venta.facturada || !venta.estado)
      throw new Error(
        'No se pueden agregar productos a esta venta, porque esta desactivada',
      );

    const precio = await this.preciosService.findOne(+dto.precio_id);
    if (!precio || !precio.estado || !precio.producto.estado)
      throw new Error(
        'No se pueden agregar este producto porque fue desactivado',
      );

    const detalle = this.detalleRepository.create({
      cantidad: dto.cantidad,
      concepto: `${precio.producto.producto} (${precio.detalle})`,
      unitario: precio.precio,
      total: parseFloat((precio.precio * dto.cantidad).toFixed(2)),
      precio: precio,
      ventas: venta,
      user: user,
    });
    return this.detalleRepository.save(detalle);
  }

  findByVenta(id: number): Promise<VentasDetalle[]> {
    return this.detalleRepository.findBy({ ventas: { id } });
  }

  async remove(id: number) {
    const detalle = await this.detalleRepository.findOneBy({ id });
    if (!detalle)
      throw new NotFoundException(
        'No se encontró el precio que intenta borrar',
      );
    return this.detalleRepository.remove(detalle);
  }
}
