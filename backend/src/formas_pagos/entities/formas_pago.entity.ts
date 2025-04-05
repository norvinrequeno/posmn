import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('formas_pagos')
export class FormasPago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  forma: string;

  @Column({ default: true })
  estado: boolean;
}
