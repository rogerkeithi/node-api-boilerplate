import mongoose from "mongoose";
import { IDatabase } from "./interfaces/database-interface";
import { injectable } from "inversify";

@injectable()
export class MongoDatabase implements IDatabase {
  async connect(): Promise<void> {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
      throw new Error("MONGO_URI não está definida no ambiente!");
    }

    try {
      await mongoose.connect(MONGO_URI);
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
