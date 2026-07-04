import mongoose, { Schema, Document } from "mongoose";

export interface FavoriteDocument extends Document {
  userId: mongoose.Types.ObjectId;
  recipeId: number;
  createdAt: Date;
}

const favoriteSchema = new Schema<FavoriteDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    recipeId: { type: Number, required: true, index: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

favoriteSchema.index({ userId: 1, recipeId: 1 }, { unique: true });

export const FavoriteModel = mongoose.model<FavoriteDocument>(
  "Favorite",
  favoriteSchema,
);
