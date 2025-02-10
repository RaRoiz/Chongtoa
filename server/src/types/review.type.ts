import Elysia, { Static, t } from "elysia"

export const _restaurantReview = t.Object({
    id: t.String(),
    userId: t.String(),
    rating: t.Number({ minimum: 0, maximum: 5 }),
    review: t.String({ minLength: 1 }),
    visit_date: t.Date(),
    created_at: t.Date(),
    updated_at: t.Date()
})

export const _review = t.Object({
    ..._restaurantReview.properties
})

export const restaurantReviewDto = new Elysia().model({
    review: _review
})

export const _createReview = t.Object({
    rating: t.Number({ minimum: 0, maximum: 5 }),
    review: t.String({ minLength: 1 }),
    visit_date: t.Date({ format: 'date-time' }),
    userId: t.Optional(t.String())
})

export const _updateReview = t.Object({
    rating: t.Optional(t.Number({ minimum: 0, maximum: 5 })),
    review: t.Optional(t.String({ minLength: 1 })),
    visit_date: t.Optional(t.String({ format: 'date-time' }))
})

export type restaurantReview = Static<typeof _restaurantReview>
export type createReview = Static<typeof _createReview>
export type updateReview = Static<typeof _updateReview>
export type review = Static<typeof _review>