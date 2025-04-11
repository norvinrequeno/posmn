import { Producto } from 'src/productos/entities/producto.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('precios')
export class Precio {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('double precision', { default: 0 })
  precio: number;
  @Column({ nullable: true })
  detalle: string;
  @Column({ default: true })
  estado: boolean;
  @ManyToOne(() => Producto, (producto) => producto.precios, {
    nullable: false,
    eager: true,
    onDelete: 'CASCADE',
  })
  producto: Producto;
}
