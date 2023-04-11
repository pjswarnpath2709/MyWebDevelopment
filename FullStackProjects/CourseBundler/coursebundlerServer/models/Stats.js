import { Schema, model } from "mongoose";
const statschema = new Schema(
  {
    users: {
      type: Number,
      default: 0,
    },
    subscriptions: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Stats", statschema);
