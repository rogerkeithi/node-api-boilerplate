import axios from "axios";
import { IUserService } from "./interfaces/user-service-interface";
import { generateSignature } from "../../config/generate-signature";
import { UserDTO } from "./dtos/user.dto";
import { injectable } from "inversify";

@injectable()
export class UserService implements IUserService {
  private userServiceUrl: string;
  private userSecretKey: string;
  constructor() {
    this.userServiceUrl = process.env.USER_SERVICE_URL || "http://user-service:4000";
    this.userSecretKey = process.env.USER_SECRET_KEY || "supersecretkey";
  }

  async getUserInfo(email: string): Promise<UserDTO> {
    try {
        const timestamp = new Date();
        const signature = generateSignature(this.userSecretKey, timestamp)
        const headers = {
          "X-Timestamp": signature.timestamp.toISOString(),
          "X-Signature": signature.signature,
        };
        const response = await axios.get(`${this.userServiceUrl}/api/user?email=${email}`, {headers});
        return response.data;
    } catch (error: any) {
        console.error("Error fetching user info:", error.response?.data || error.message);
        throw new Error("Failed to get user info");
    }
  }
}