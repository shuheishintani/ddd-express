import { TYPES } from "@/constants/types";
import { inject, injectable } from "inversify";
import { Connection, Repository } from "typeorm";

@injectable()
export class DatabaseService {
  constructor(
    @inject(TYPES.DatabaseConnection) private connection: Connection
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getRepository<T>(entity: any): Repository<T> {
    return this.connection.getRepository(entity);
  }
}
