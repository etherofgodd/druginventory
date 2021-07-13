import mongoose from "mongoose";

const drugSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    desc: {
      type: String,
      required: true,
    },

    dosage: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    sideEffects: {
      type: String,
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Drug = mongoose.model("Drug", drugSchema);

export default Drug;
