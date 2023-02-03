import { v4 as uuidV4 } from "uuid";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];
  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = {
      id: uuidV4(),
      name,
      password,
      email,
      created_at: new Date(),
      updated_at: new Date(),
      courses: [],
    };

    Object.assign(user, {
      name,
      email,
      password,
      id: user.id,
      created_at: user.created_at,
      updated_at: user.updated_at,
      courses: [],
    });

    this.users.push(user);

    return user;
  }
  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.id === id);

    return user;
  }
}

export { UsersRepositoryInMemory };
