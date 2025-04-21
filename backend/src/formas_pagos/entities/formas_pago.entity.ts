import { Pago } from 'src/pagos/entities/pago.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('formas_pagos')
export class FormasPago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  forma: string;

  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => Pago, (p) => p.forma)
  pagos: Pago[];
}
