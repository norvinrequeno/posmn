import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
}
