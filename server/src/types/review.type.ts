import { Static , t} from "elysia"

export const _restaurantReview = t.Object({
    id: t.String(),
    rating: t.Number({ minimum: 0, maximum: 5 }),
    review: t.String(),
    visit_date: t.Date(),
    created_at: t.Optional(t.Date()),
    updated_at: t.Optional(t.Date()),
})

export type restaurantReview = Static<typeof _restaurantReview>