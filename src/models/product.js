import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category"
    }
  },
  { timestamps: true, versionKey: false }
);
productSchema.plugin(mongoosePaginate);
export default mongoose.model("Product", productSchema);
