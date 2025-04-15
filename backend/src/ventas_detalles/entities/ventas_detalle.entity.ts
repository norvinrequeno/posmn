import { Precio } from 'src/precios/entities/precio.entity';
import { User } from 'src/users/user.entity';
import { Venta } from 'src/ventas/entities/venta.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ventas_detalles')
export class VentasDetalle {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'integer' })
  cantidad: number;
  @Column()
  concepto: string;
  @Column('double precision', { default: 0 })
  unitario: number;
  @Column('double precision', { default: 0 })
  total: number;

  @ManyToOne(() => Precio, (precio) => precio.detalle_ventas, {
    nullable: false,
    eager: true,
  })
  precio: Precio;

  @ManyToOne(() => Venta, (v) => v.detalle_ventas, {
    nullable: false,
    eager: true,
  })
  ventas: Venta;

  @ManyToOne(() => User, (v) => v.detalle_ventas, {
    nullable: false,
    eager: true,
  })
  user: User;
}
