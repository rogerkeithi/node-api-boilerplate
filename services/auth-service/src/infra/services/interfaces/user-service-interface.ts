import { UserDTO } from "../dtos/user.dto";

export interface IUserService {
    getUserInfo(email: string): Promise<UserDTO>;
}