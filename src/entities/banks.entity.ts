import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'banks',
})
export class Banks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'bigint',
    nullable: false,
  })
  finance: number;

  @Column({
    type: 'integer',
    nullable: false,
  })
  starting_payment: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  img_url: string;
}
