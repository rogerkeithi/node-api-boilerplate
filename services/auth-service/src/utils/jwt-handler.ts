import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "jwt-secret";

export function generateToken(
    payload: object,
    expiresIn: string | number = "30m"
  ): string {
    return jwt.sign(payload, SECRET_KEY, { expiresIn } as SignOptions);
  }

export function verifyToken(token: string): JwtPayload | string | null {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (error) {
      return null;
    }
  }