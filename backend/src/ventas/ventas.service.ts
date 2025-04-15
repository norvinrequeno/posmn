import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private readonly ventasRepository: Repository<Venta>,
    private readonly usersService: UsersService,
  ) {}
  async create(user_id: number, dto: CreateVentaDto): Promise<Venta> {
    const user = await this.usersService.findOne(user_id);
    if (!user)
      throw new NotFoundException(
        'Usuario no encontrado, revise si tiene una sesión valida',
      );

    const venta = this.ventasRepository.create({
      ...dto,
      user,
    });
    return this.ventasRepository.save(venta);
  }

  async findAll(): Promise<Venta[]> {
    return await this.ventasRepository.find();
  }

  async findOne(id: number): Promise<Venta | null> {
    return this.ventasRepository.findOneBy({ id });
  }

  async findActive(): Promise<Venta[]> {
    return this.ventasRepository.find({
      where: { estado: true, facturada: false, completa: false },
    });
  }

  async findComplete(): Promise<Venta[]> {
    return this.ventasRepository.find({
      where: { estado: true, facturada: false, completa: true },
    });
  }

  async update(id: number, dto: UpdateVentaDto) {
    const venta = await this.findOne(id);
    if (!venta)
      throw new NotFoundException(
        'No se encontró el registro que intenta editar',
      );

    if (!venta.estado) throw new Error('Esta venta ya no esta activa');

    Object.assign(venta, dto);
    return this.ventasRepository.save(venta);
  }

  async completa(id: number) {
    const venta = await this.findOne(id);
    if (!venta)
      throw new NotFoundException(
        'No se encontró el registro que intenta editar',
      );

    if (!venta.estado) throw new Error('Esta venta ya no esta activa');

    venta.completa = true;
    return this.ventasRepository.save(venta);
  }
  async eliminada(id: number) {
    const venta = await this.findOne(id);
    if (!venta)
      throw new NotFoundException(
        'No se encontró el registro que intenta editar',
      );

    if (!venta.estado) throw new Error('Esta venta ya no esta activa');

    venta.completa = false;
    venta.facturada = false;
    venta.estado = false;
    await this.ventasRepository.save(venta);
  }
}
