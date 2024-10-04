import { ResponseCustom } from "@/app/types/response-custom";
import { IUser } from "../domain/models/IUser";
import { UserRepository } from "../repositories/UserRepository";
import { ResponseMessages } from "@/app/types/enums/ResponseMessages";
import { User } from "../domain/entities/User";

export class UserService {
  private _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  async create(user: IUser): Promise<ResponseCustom<User>> {
    const result = await this._userRepository.create(user);

    if (!result)
      return {
        data: {
          message: `${ResponseMessages.INTERNAL_SERVER_ERROR}: Error al crear el cliente`,
        },
        status: 500,
      };

    return { data: result, status: 201 };
  }

  async getById(id: string): Promise<ResponseCustom<User>> {
    const user = await this._userRepository.findById(id);

    if (user) return { data: user, status: 200 };

    return { data: { message: ResponseMessages.USER_NOT_FOUND }, status: 400 };
  }
}
