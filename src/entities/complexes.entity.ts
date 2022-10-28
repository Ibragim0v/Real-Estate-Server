import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Companies } from './companies.entity';
import { Rooms } from './rooms.entity';

@Entity({
  name: 'complexes',
})
export class Complexes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
  })
  address: string;

  @Column({
    type: 'integer',
    nullable: false,
  })
  price: number;

  @ManyToOne(() => Companies, (c) => c.complexes, { onDelete: 'CASCADE' })
  company: Companies;

  @OneToMany(() => Rooms, (r) => r.complex)
  rooms: Rooms[];
}
