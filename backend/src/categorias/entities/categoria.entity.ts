import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoria: string;

  @Column({ default: true })
  estado: boolean;
}
