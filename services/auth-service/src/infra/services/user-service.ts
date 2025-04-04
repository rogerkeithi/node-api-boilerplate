import axios from "axios";
import { IUserService } from "./interfaces/user-service-interface";
import { UserDTO } from "./dtos/user.dto";
import { injectable } from "inversify";
import { generateSignature } from "@rk-org/shared";

@injectable()
export class UserService implements IUserService {
  private userServiceUrl?: string;
  private userSecretKey?: string;
  constructor() {
    this.userServiceUrl = process.env.USER_SERVICE_URL;
    this.userSecretKey = process.env.USER_SECRET_KEY;
  }

  async getUserInfo(email: string): Promise<UserDTO> {
    try {
        const timestamp = new Date();
        if(!this.userSecretKey){
          throw new Error("Failed to request");
          
        }
        const signature = generateSignature(this.userSecretKey, timestamp)
        const headers = {
          "X-Timestamp": signature.timestamp.toISOString(),
          "X-Signature": signature.signature,
        };
        if(!this.userServiceUrl){
          throw new Error("User service not set");
          
        }
        const response = (await axios.get<{success:boolean, data: UserDTO}>(`${this.userServiceUrl}/api/user?email=${email}`, {headers})).data;
        const responseData = response.data
        const userDTO = new UserDTO(
          responseData.id, 
          responseData.name, 
          responseData.email, 
          responseData.role, 
          responseData.password, 
          responseData.createdAt, 
          responseData.updatedAt, 
        )
        return userDTO;
    } catch (error: any) {
        console.error("Error fetching user info:", error.response?.data || error.message);
        throw new Error("Failed to get user info");
    }
  }
}