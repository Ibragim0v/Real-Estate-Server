import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({
  name: "admins",
})
export class Admins {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 64,
    nullable: false,
  })
  username: string;

  @Column({
    type: "varchar",
    length: 64,
    nullable: false,
  })
  password: string;
}
