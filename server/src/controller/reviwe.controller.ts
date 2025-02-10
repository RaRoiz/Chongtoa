import Elysia from "elysia"
import { t } from "elysia"
import { AuthMiddleWare, AuthPlayload } from "../middlewares/auth.middleware"
import { ReviewService } from "../services/review.service"
import { reviewDto } from "../types/review.type"

const reviews: Record<string, any> = {}

export const ReviewsController = new Elysia({
    prefix: '/api/reviews',
    tags: ['Reviews']
})
    .use(AuthMiddleWare)
    .use(reviewDto)

    .get("/", () => Object.values(reviews), {
        detail: { summary: "Get all reviews" },
        response: t.Array(t.Object({
            id: t.String(),
            username: t.String(),
            review: t.String(),
            rating: t.Number(),
            createdAt: t.Date()
        }))
    })

    .get("/:id", ({ params }) => {
        const review = reviews[params.id]
        return review ? review : { error: "Review not found" }
    }, {
        detail: { summary: "Get review by ID" },
        params: t.Object({
            id: t.String()
        }),
        response: t.Object({
            id: t.String(),
            username: t.String(),
            review: t.String(),
            rating: t.Number(),
            createdAt: t.Date()
        })
    })

    .get('/restaurant/:restaurantId', async ({ params }) => {
        return await ReviewService.getReviewsByRestaurant(params.restaurantId)
    }, {
        detail: { summary: 'Get reviews by restaurant' }
    })

    .get('/user/:userId', async ({ params }) => {
        return await ReviewService.getReviewsByUser(params.userId)
    }, {
        detail: { summary: 'Get reviews by user' }
    })

    .post("/", ({ body, set }) => {
        const id = new Date().getTime().toString()
        const newReview = {
            id,
            ...body,
            createdAt: new Date(),
        }
        reviews[id] = newReview
        set.status = 201
        return newReview
    }, {
        detail: { summary: "Create a new review" },
        body: t.Object({
            username: t.String(),
            review: t.String(),
            rating: t.Number()
        }),
        response: t.Object({
            id: t.String(),
            username: t.String(),
            review: t.String(),
            rating: t.Number(),
            createdAt: t.Date()
        })
    })

    .put('/:id', async ({ params, body, Auth, set }) => {
        const userId = (Auth.payload as AuthPlayload).id
        const updatedReview = await ReviewService.updateReview(params.id, userId, body)
        if (!updatedReview) {
            set.status = 404
            throw new Error('Review not found or unauthorized')
        }
        return updatedReview
    }, {
        body: 'updateReview',
        detail: { summary: 'Update review' },
        response: 'review',
        isSignIn: true
    })

    .delete('/:id', async ({ params, Auth, set }) => {
        const userId = (Auth.payload as AuthPlayload).id
        const deleted = await ReviewService.deleteReview(params.id, userId)
        if (!deleted) {
            set.status = 404
            throw new Error('Review not found or unauthorized')
        }
        return { message: 'Review deleted successfully' }
    }, {
        detail: { summary: 'Delete review' },
        isSignIn: true
    })