import mongoose, { Schema, Document } from "mongoose";

export interface ILog extends Document {
  method: string;
  url: string;
  timestamp: Date;
  status: number;
  user?: mongoose.Types.ObjectId;
  ip?: string;
  responseTime?: number;
}

const LogSchema: Schema = new Schema({
  method: { type: String, required: true },
  url: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  ip: { type: String },
  responseTime: { type: Number },
});

export default mongoose.model<ILog>("Log", LogSchema);
