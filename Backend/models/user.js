import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["builder", "founder", "designer", "writer", "investor"],
      default: "builder",
    },
    bio: {
      type: String,
    },
    isVarified: {
      type: Boolean,
      default: false,
    },
    varificationCode: {
      type: String,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true },
);

//hashing password with bycrit
userSchema.pre("save", async function () {
  //if password is new or not modified not hash -return
  if (!this.isModified("password")) return;

  //   const salt = await bcrypt.genSalt(8);
  this.password = await bcrypt.hashSync(this.password, 10);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = new mongoose.model("user", userSchema);

export default User;
