import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ReportVentaDto } from './dto/report-venta.dto';

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

  async facturada(id: number) {
    const venta = await this.findOne(id);
    if (!venta)
      throw new NotFoundException(
        'No se encontró el registro que intenta editar',
      );

    if (!venta.estado) throw new Error('Esta venta ya no esta activa');

    venta.completa = true;
    venta.facturada = true;
    venta.estado = false;
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

  async reporte(dto: ReportVentaDto): Promise<Venta[]> {
    const query = this.ventasRepository
      .createQueryBuilder('ventas')
      .leftJoinAndSelect('ventas.pagos', 'pagos')
      .leftJoinAndSelect('pagos.forma', 'formaPago')
      .where('ventas.facturada = true');

    if (dto.inicio && dto.fin)
      query.andWhere(
        'DATE(ventas.fecha) between DATE(:inicio) AND DATE(:fin)',
        {
          inicio: dto.inicio,
          fin: dto.fin,
        },
      );
    else
      query.andWhere('DATE(ventas.fecha) = DATE(:inicio)', {
        inicio: dto.inicio,
      });
    return await query.getMany();
  }
}
