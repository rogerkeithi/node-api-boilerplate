import mongoose from "mongoose";
import { injectable } from "inversify";
import { IDatabase } from "@rk-org/shared";

@injectable()
export class MongoDatabase implements IDatabase {
  private mongoUri = process.env.MONGO_URI;
  async connect(): Promise<void> {
    if (!this.mongoUri) {
      throw new Error("Mongo uri not found.");
    }

    try {
      await mongoose.connect(this.mongoUri)
      console.log("Conectado ao MongoDB com sucesso!");
    } catch (error) {
      console.error("Erro ao conectar ao MongoDB:", error);
      process.exit(1);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log("Desconectado do MongoDB!");
    } catch (error) {
      console.error("Erro ao desconectar do MongoDB:", error);
    }
  }
}
