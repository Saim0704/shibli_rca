import mongoose from "mongoose";

export interface IConfig {
  _id?: string;
  name: string;
  value: string;
}

const configSchema = new mongoose.Schema<IConfig>({
  name: { type: String, required: true, unique: true },
  value: { type: String, required: true },
});

export const Config = mongoose.model<IConfig>("Config", configSchema);
