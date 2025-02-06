import Elysia, { Static, t } from "elysia"

export const _restaurantReview = t.Object({
    id: t.String(),
    rating: t.Number({ minimum: 0, maximum: 5 }),
    review: t.String(),
    visit_date: t.Date(),
    created_at: t.Optional(t.Date()),
    updated_at: t.Optional(t.Date()),
})
export const _review = t.Object({
    ..._restaurantReview.properties,
})

export const restaurantReviewDto = new Elysia().model({
    review: _review
})

export const _createReview = t.Object(t.Omit(_restaurantReview, ['id', 'created_at', 'updated_at']).properties)
export const _updateReview = t.Object(t.Partial(_restaurantReview).properties)

export type createReview = Static<typeof _createReview>
export type updateReview = Static<typeof _updateReview>
export type review = Static<typeof _review>