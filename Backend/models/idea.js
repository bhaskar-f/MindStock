import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    tags: [{ type: String }],
    state: {
      type: String,
      enum: ["incoming", "on hold", "in play", "liquidated"],
      default: "incoming",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

ideaSchema.pre("save", function () {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
});

const Idea = mongoose.model("idea", ideaSchema);

export default Idea;
