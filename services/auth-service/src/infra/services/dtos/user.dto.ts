export class UserDTO {
    id: string;
    name: string;
    email: string;
    role: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(    
      id: string,
      name: string,
      email: string,
      role: string,
      password: string,
      createdAt: Date,
      updatedAt: Date,
    ){
      this.id = id;
      this.name = name;
      this.email = email;
      this.role = role;
      this.password = password;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }