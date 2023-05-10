import { AppDataSource } from "@infra/database";
import { IUpdateUserDTO } from "@modules/users/dtos/IUpdateUserDTO";
import { Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const user = this.repository.create(data);

    await this.repository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  async update(data: IUpdateUserDTO, id: string): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update(User)
      .set({
        ...data,
        updated_at: new Date(),
      })
      .where("id = :id", { id })
      .execute();
  }
}

export { UsersRepository };
