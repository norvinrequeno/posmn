import { User } from 'src/users/user.entity';
import { VentasDetalle } from 'src/ventas_detalles/entities/ventas_detalle.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ventas')
export class Venta {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha: Date;
  @Column({ nullable: true })
  titular: string;
  @Column({ default: true })
  estado: boolean;
  @Column({ default: false })
  facturada: boolean;
  @Column({ default: false })
  completa: boolean;
  @ManyToOne(() => User, (user) => user.ventas, {
    nullable: false,
    eager: true,
  })
  user: User;

  @OneToMany(() => VentasDetalle, (v) => v.ventas)
  detalle_ventas: VentasDetalle[];
}
