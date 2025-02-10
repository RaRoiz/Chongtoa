import mongoose from "mongoose"
import { restaurantReview } from "../types/review.type"

interface IReviewDocument extends mongoose.Document {
    userId: string
    restaurantId: string
    rating: number
    review: string
    visit_date: Date
    created_at: Date
    updated_at: Date
    toReview: () => restaurantReview
}

const schema = new mongoose.Schema<IReviewDocument>({
    userId: { type: String, required: true },
    restaurantId: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    review: { type: String, required: true },
    visit_date: { type: Date, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

schema.methods.toReview = function (): restaurantReview {
    return {
        id: this._id.toString(),
        userId: this.userId,
        restaurantId: this.restaurantId,
        rating: this.rating,
        review: this.review,
        visit_date: this.visit_date,
        created_at: this.created_at,
        updated_at: this.updated_at
    }
}

export const Review = mongoose.model<IReviewDocument>('Review', schema)