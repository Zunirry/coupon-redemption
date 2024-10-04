import { Repository } from "typeorm";
import { User } from "../domain/entities/User";
import { IUser } from "../domain/models/IUser";

export class UserRepository {
  private _userRepository: Repository<User>;

  constructor(userRepository: Repository<User>) {
    this._userRepository = userRepository;
  }

  async create(user: IUser): Promise<User> {
    const newUser = this._userRepository.create(user);

    return this._userRepository.save(newUser);
  }

  async findById(id: string): Promise<User | null> {
    const result = this._userRepository.findOne({
      where: { id },
      relations: ["coupons"],
    });

    return result;
  }
}
