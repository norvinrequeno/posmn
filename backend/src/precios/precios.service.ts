import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrecioDto } from './dto/create-precio.dto';
import { UpdatePrecioDto } from './dto/update-precio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Precio } from './entities/precio.entity';
import { Repository } from 'typeorm';
import { Producto } from 'src/productos/entities/producto.entity';

@Injectable()
export class PreciosService {
  constructor(
    @InjectRepository(Precio)
    private readonly precioRepository: Repository<Precio>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}
  async create(dto: CreatePrecioDto): Promise<Precio> {
    const producto = await this.productoRepository.findOneBy({
      id: dto.producto_id,
    });

    if (!producto) throw new NotFoundException('No se encontró el producto');

    const precio = this.precioRepository.create({
      ...dto,
      producto,
    });
    return this.precioRepository.save(precio);
  }

  findAll(): Promise<Precio[]> {
    return this.precioRepository.find();
  }

  async findOne(id: number): Promise<Precio> {
    const precio = await this.precioRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!precio) throw new NotFoundException('No se encontró el precio');
    return precio;
  }

  async findByProducto(id: number): Promise<Precio[]> {
    return this.precioRepository.find({
      where: {
        producto: { id },
      },
    });
  }

  async update(id: number, dto: UpdatePrecioDto): Promise<Precio | null> {
    const precio = await this.findOne(id);

    if (!precio) throw new NotFoundException('No se encontró el precio');

    if (dto.producto_id && precio.producto.id !== dto.producto_id) {
      const producto = await this.productoRepository.findOneBy({
        id: dto.producto_id,
      });
      if (!producto) throw new NotFoundException('No se encontró el producto');

      precio.producto = producto;
    }

    Object.assign(precio, dto);
    return this.precioRepository.save(precio);
  }
  async changeEstado(id: number): Promise<Precio | undefined> {
    const precio = await this.findOne(id);
    if (!precio) {
      throw new Error('No se encontró el precio');
    }
    precio.estado = !precio.estado;
    return this.precioRepository.save(precio);
  }
  async remove(id: number) {
    const precio = await this.findOne(id);
    return this.precioRepository.remove(precio);
  }
}
