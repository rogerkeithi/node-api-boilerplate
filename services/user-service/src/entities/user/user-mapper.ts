import { User } from "./user";

export class UserMapper {
    static toDTO(user: User): Omit<User, 'password'> {
        const userWithoutPassword = { ...user };
        delete userWithoutPassword.password;
        return userWithoutPassword;
      }
  }