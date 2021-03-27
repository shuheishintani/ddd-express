import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({
    default: false,
  })
  done!: boolean;

  @Column({
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at!: Date;

  @Column()
  userId!: number;

  @ManyToOne(() => User, (user) => user.tasks)
  user!: User;
}
