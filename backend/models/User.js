import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      trim: true, 
      default: "" 
    },

    email: { 
      type: String, 
      trim: true, 
      lowercase: true, 
      unique: true, 
      required: true 
    },

    passwordHash: { 
      type: String, 
      default: null 
    }, // null if Google-only

    googleId: { 
      type: String, 
      default: null 
    },

    role: { 
      type: String, 
      enum: ["user", "admin"], 
      default: "user" 
    },

    isVerified: { 
      type: Boolean, 
      default: false 
    },

    isActive: { 
      type: Boolean, 
      default: true 
    }, // soft delete

    otpHash: { 
      type: String, 
      default: null 
    },

    otpExpiresAt: { 
      type: Date, 
      default: null 
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
