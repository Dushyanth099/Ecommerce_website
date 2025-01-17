import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", //relation betwen the review and the user
    },
  },
  {
    timestamps: true,
  }
);

const bannerSchema = mongoose.Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", //relation betwen the product and yhe user
    },
    name: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    category: [
      {
        type: String,
        required: true,
      },
    ],
    sizes: [
      {
        type: String,
        required: true,
      },
    ],
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    oldPrice: {
      type: Number,
      default: 0, // Optional, can be left blank if no discount
    },
    discount: {
      type: Number,
      default: 0, // Percentage discount (e.g., 20 for 20%)
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    banners: [bannerSchema],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
