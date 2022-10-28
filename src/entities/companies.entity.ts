import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Complexes } from './complexes.entity';
@Entity({
  name: 'companies',
})
export class Companies {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  img_url: string;

  @OneToMany(() => Complexes, (c) => c.company)
  complexes: Complexes[];
}
