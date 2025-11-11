// import mongoose from "mongoose";

// const stripedShirtSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     brand: { type: String, required: true },
//     size: { type: String, required: true },
//     imageUrl: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("StripedShirt", stripedShirtSchema);

import mongoose from "mongoose";

const stripedShirtSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    sizes: [{ type: String, required: true }], // multiple sizes
    images: [{ type: String, required: true }], // multiple images
  },
  { timestamps: true }
);

export default mongoose.model("StripedShirt", stripedShirtSchema);
