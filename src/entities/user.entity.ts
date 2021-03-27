import * as bcrypt from "bcryptjs";
import { Matches, Max, Min } from "class-validator";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Task } from "./task.entity";

@Entity()
@Unique(["username"])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Max(20)
  @Matches(/^[a-zA-Z0-9]+$/)
  username!: string;

  @Column()
  @Min(8)
  @Matches(/^[a-zA-Z0-9]+$/)
  password!: string;

  @Column({
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at!: Date;

  @Column({
    default: () => "CURRENT_TIMESTAMP",
  })
  updated_at!: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  passwordIsValid(rawPassword: string): boolean {
    return bcrypt.compareSync(rawPassword, this.password);
  }
}
