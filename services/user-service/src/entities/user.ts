import { randomUUID } from "crypto";

export class User {
  public readonly id: string;
  public name: string;
  public email: string;
  public password: string;

  constructor(name: string, email: string, password: string, id?: string) {
    this.id = id ?? randomUUID();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}