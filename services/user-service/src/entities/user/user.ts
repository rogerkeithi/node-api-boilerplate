export class User {
  public id?: string;
  public name: string;
  public email: string;
  public password?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(name: string, email: string, password?: string, id?: string, createdAt?: Date, updatedAt?: Date) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}