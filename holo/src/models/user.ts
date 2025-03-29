import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  password: string;
  email: string;
  twoFactorAuth: boolean;
  invoiceArray: mongoose.Types.ObjectId[];
  settingsId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  referralId: mongoose.Types.ObjectId;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    twoFactorAuth: { type: Boolean, default: false },
    invoiceArray: [{ type: Schema.Types.ObjectId, ref: "Invoice" }],
    settingsId: { type: Schema.Types.ObjectId, ref: "Settings", required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: "Receiver", required: true },
    referralId: { type: Schema.Types.ObjectId, ref: "User" }, // Связь с другим пользователем
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
