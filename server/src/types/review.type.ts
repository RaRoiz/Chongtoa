import Elysia, { Static, t } from "elysia"

export const _restaurantReview = t.Object({
    id: t.String(),
    userId: t.String(),
    restaurantId: t.String(),
    rating: t.Number({ minimum: 0, maximum: 5 }),
    review: t.String({ minLength: 1 }),
    visit_date: t.Date(),
    created_at: t.Date(),
    updated_at: t.Date()
})

export const _createReview = t.Object({
    restaurantId: t.String(),
    rating: t.Number({ minimum: 0, maximum: 5 }),
    review: t.String({ minLength: 1 }),
    visit_date: t.String(),
    token: t.String() // Add token field to ensure login
})

export const _updateReview = t.Object({
    rating: t.Optional(t.Number({ minimum: 0, maximum: 5 })),
    review: t.Optional(t.String({ minLength: 1 })),
    visit_date: t.Optional(t.String()),
})

export const reviewDto = new Elysia().model({
    review: _restaurantReview,
    createReview: _createReview,
    updateReview: _updateReview
})

export type restaurantReview = Static<typeof _restaurantReview>
export type createReview = Static<typeof _createReview>
export type updateReview = Static<typeof _updateReview>