import { Venta } from 'src/ventas/entities/venta.entity';
import { VentasDetalle } from 'src/ventas_detalles/entities/ventas_detalle.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => Venta, (venta) => venta.user)
  ventas: Venta[];

  @OneToMany(() => VentasDetalle, (v) => v.user)
  detalle_ventas: VentasDetalle[];
}
