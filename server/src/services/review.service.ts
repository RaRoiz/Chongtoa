import { Review } from "../model/review.model"
import { createReview, restaurantReview, updateReview } from "../types/review.type"

export const ReviewService = {
    // Get all reviews
    getAllReviews: async function (): Promise<restaurantReview[]> {
        const reviews = await Review.find()
            .sort({ created_at: -1 })
            .exec()
        return reviews.map(review => review.toReview())
    },

    // Get review by ID
    getReviewById: async function (id: string): Promise<restaurantReview | null> {
        const review = await Review.findById(id).exec()
        return review ? review.toReview() : null
    },

    // Get reviews by restaurant ID
    getReviewsByRestaurant: async function (restaurantId: string): Promise<restaurantReview[]> {
        const reviews = await Review.find({ restaurantId })
            .sort({ created_at: -1 })
            .exec()
        return reviews.map(review => review.toReview())
    },

    // Get reviews by user ID
    getReviewsByUser: async function (userId: string): Promise<restaurantReview[]> {
        const reviews = await Review.find({ userId })
            .sort({ created_at: -1 })
            .exec()
        return reviews.map(review => review.toReview())
    },

    // Create new review
    createReview: async function (reviewData: createReview & { userId: string }): Promise<restaurantReview> {
        const review = await Review.create({
            ...reviewData,
            created_at: new Date(),
            updated_at: new Date()
        })
        return review.toReview()
    },

    // Update review
    updateReview: async function (id: string, userId: string, updateData: updateReview): Promise<restaurantReview | null> {
        const review = await Review.findOneAndUpdate(
            { _id: id, userId },
            {
                ...updateData,
                updated_at: new Date()
            },
            { new: true }
        ).exec()
        return review ? review.toReview() : null
    },

    // Delete review
    deleteReview: async function (id: string, userId: string): Promise<boolean> {
        const result = await Review.deleteOne({ _id: id, userId }).exec()
        return result.deletedCount > 0
    }
}