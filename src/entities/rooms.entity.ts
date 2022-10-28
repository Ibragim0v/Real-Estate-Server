import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Complexes } from './complexes.entity';

@Entity({
  name: 'rooms',
})
export class Rooms {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'integer',
    nullable: false,
  })
  rooms: number;

  @Column({
    type: 'integer',
    nullable: false,
  })
  square: number;

  @ManyToOne(() => Complexes, (c) => c.rooms, { onDelete: 'CASCADE' })
  complex: Complexes;
}
