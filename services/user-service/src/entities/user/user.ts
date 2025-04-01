import { Roles } from "../../enums/role-enum";
export class User {
  public id?: string;
  public name: string;
  public email: string;
  public role: Roles;
  public password?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(name: string, email: string, role: Roles, password?: string, id?: string, createdAt?: Date, updatedAt?: Date) {
    this.name = name;
    this.email = email;
    this.role = role;
    this.password = password;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}