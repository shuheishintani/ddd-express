import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from "typeorm";
import { Task } from "./task.entity";
import * as bcrypt from "bcryptjs";

@Entity()
@Unique(["username"])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
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

  passwordIsValid(unencryptedPassword: string): boolean {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
