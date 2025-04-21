import { FormasPago } from 'src/formas_pagos/entities/formas_pago.entity';
import { Venta } from 'src/ventas/entities/venta.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pagos')
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('double precision', { default: 0 })
  monto: number;

  @ManyToOne(() => FormasPago, (forma) => forma.pagos, {
    nullable: false,
    eager: true,
  })
  forma: FormasPago;

  @ManyToOne(() => Venta, (v) => v.pagos, { nullable: false, eager: false })
  venta: Venta;
}
