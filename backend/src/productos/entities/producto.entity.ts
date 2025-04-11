import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Precio } from 'src/precios/entities/precio.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
//cSpell:ignore categorias categoria
@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  producto: string;

  @Column({ nullable: true })
  detalle: string;

  @Column({ default: true })
  estado: boolean;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos, {
    nullable: false,
    eager: true,
  })
  categoria: Categoria;

  @OneToMany(() => Precio, (precio) => precio.producto)
  precios: Precio;
}
