import { User } from "./user";

export class UserMapper {
  static toPersistence(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }

  static toDomain(userDocument: any): User {
    return new User(userDocument.name, userDocument.email, userDocument.password, userDocument.id);
  }
}
