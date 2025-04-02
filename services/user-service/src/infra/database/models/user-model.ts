import { Schema, model, Document } from "mongoose";
import { Roles } from "../../../enums/role-enum";

export interface UserDocument extends Document {
  id: string;
  name: string;
  email: string;
  role: Roles;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: Object.values(Roles), required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const userModel = model<UserDocument>("User", UserSchema);