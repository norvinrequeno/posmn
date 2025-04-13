import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';
//cSpell:ignore categoria categorias
@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}
  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const categoria = this.categoriaRepository.create(createCategoriaDto);
    return this.categoriaRepository.save(categoria);
  }

  async findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }
  async findActive(): Promise<Categoria[]> {
    try {
      return await this.categoriaRepository.find({
        where: { estado: true },
        order: { categoria: 'ASC' },
      });
    } catch (error) {
      console.error('Error en findActive:', error);
      throw new InternalServerErrorException(
        'Error al buscar categorías activas',
      );
    }
  }

  async findOne(id: number): Promise<Categoria | null> {
    return this.categoriaRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<Categoria | undefined> {
    const categoria = await this.categoriaRepository.preload({
      id,
      ...updateCategoriaDto,
    });
    if (!categoria) {
      throw new Error('No se encontró el registro');
    }
    return this.categoriaRepository.save(categoria);
  }

  async changeEstado(id: number): Promise<Categoria | undefined> {
    const categoria = await this.findOne(id);
    if (!categoria) {
      throw new Error('No se encontró el registro');
    }
    categoria.estado = !categoria.estado;
    return this.categoriaRepository.save(categoria);
  }

  async remove(id: number) {
    const categoria = await this.findOne(id);
    if (!categoria) {
      throw new Error('No se encontró el registro');
    }
    return this.categoriaRepository.remove(categoria);
  }
}
