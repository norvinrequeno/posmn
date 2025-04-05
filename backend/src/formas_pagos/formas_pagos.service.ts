import { Injectable } from '@nestjs/common';
import { CreateFormasPagoDto } from './dto/create-formas_pago.dto';
import { UpdateFormasPagoDto } from './dto/update-formas_pago.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FormasPago } from './entities/formas_pago.entity';
import { Repository } from 'typeorm';
//cSpell:ignore Respository
@Injectable()
export class FormasPagosService {
  constructor(
    @InjectRepository(FormasPago)
    private readonly formasPagoRespository: Repository<FormasPago>,
  ) {}
  async create(createFormasPagoDto: CreateFormasPagoDto): Promise<FormasPago> {
    const formas = this.formasPagoRespository.create(createFormasPagoDto);
    return this.formasPagoRespository.save(formas);
  }

  findAll(): Promise<FormasPago[]> {
    return this.formasPagoRespository.find();
  }
  findActive(): Promise<FormasPago[]> {
    return this.formasPagoRespository.find({ where: { estado: true } });
  }

  findOne(id: number): Promise<FormasPago | null> {
    return this.formasPagoRespository.findOne({ where: { id: id } });
  }
  async update(
    id: number,
    updateFormasPagoDto: UpdateFormasPagoDto,
  ): Promise<FormasPago | undefined> {
    const forma = await this.formasPagoRespository.preload({
      id,
      ...updateFormasPagoDto,
    });
    if (!forma)
      throw new Error('No se encontró el registro que intenta editar');

    return this.formasPagoRespository.save(forma);
  }

  async remove(id: number): Promise<void> {
    const forma = await this.findOne(id);
    if (!forma)
      throw new Error('No se encontró el registro que intenta eliminar');

    await this.formasPagoRespository.remove(forma);
  }
}
