import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    originalName: { 
        type: String, 
        required: true 
    },
    filename: { 
        type: String, 
        required: true 
    },       
    mimeType: {
        type: String, 
        required: true 
    },
    size: { 
        type: Number, 
        required: true 
    },
    url: { 
        type: String, 
        required: true 
    },           
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    tags: [{ type: String }],

    isShared: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Media", mediaSchema);
