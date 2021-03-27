import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
  name: { type: String, required: true },
  Image: { type: String, required: true },
  createdAt: { type: Date, default: new Date().toISOString() },
});

export default mongoose.model("Profile", profileSchema);
