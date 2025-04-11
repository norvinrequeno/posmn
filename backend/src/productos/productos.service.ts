import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { Categoria } from 'src/categorias/entities/categoria.entity';
//cSpell:ignore categorias categoria
@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const categoria = await this.categoriaRepository.findOneBy({
      id: createProductoDto.categorias_id,
    });
    if (!categoria)
      throw new NotFoundException('No se encontró la categoria seleccionada');

    const producto = this.productoRepository.create({
      ...createProductoDto,
      categoria,
    });

    return this.productoRepository.save(producto);
  }

  findAll(): Promise<Producto[]> {
    return this.productoRepository.find();
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOneBy({ id: id });

    if (!producto) throw new NotFoundException('No se encontró el producto');

    return producto;
  }

  async update(
    id: number,
    updateProductoDto: UpdateProductoDto,
  ): Promise<Producto> {
    const producto = await this.findOne(id);

    if (!producto)
      throw new NotFoundException(
        'No se encontró el producto que intenta editar',
      );

    if (
      updateProductoDto.categorias_id &&
      producto.categoria.id !== updateProductoDto.categorias_id
    ) {
      const categoria = await this.categoriaRepository.findOneBy({
        id: updateProductoDto.categorias_id,
      });
      if (!categoria)
        throw new NotFoundException(
          'No se encontró la categoria que intenta editar',
        );

      producto.categoria = categoria;
    }
    Object.assign(producto, updateProductoDto);
    return this.productoRepository.save(producto);
  }

  async changeEstado(id: number): Promise<Producto | undefined> {
    const producto = await this.findOne(id);
    if (!producto) {
      throw new Error('No se encontró el registro');
    }
    producto.estado = !producto.estado;
    return this.productoRepository.save(producto);
  }
  async remove(id: number) {
    const producto = await this.findOne(id);
    return this.productoRepository.remove(producto);
  }
}
