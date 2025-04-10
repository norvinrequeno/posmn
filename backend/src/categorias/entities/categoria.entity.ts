import { Producto } from 'src/productos/entities/producto.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
//cSpell:ignore categorias categoria
@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoria: string;

  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => Producto, (producto) => producto.categoria)
  productos: Producto[];
}
