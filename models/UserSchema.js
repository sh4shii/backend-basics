import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    // username
    // username: {
    //   type: String,
    //   required: false
    // },
    // phoneNo: {
    //   type: Number
    //   required: true
    // }
  },
  { timestamps: true }
);

/*
  Hash password before saving (eitehr handle it here only in pre or handle while creating in controller)
*/
userSchema.pre('save', async function () {
  // Only hash if password is modified (or new user)
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // salt to remove collision and more strong hashing
});

// const User = mongoose.model("user", userSchema);
// above line will also work but is bad because it doesn't check where this table already exists or not
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;