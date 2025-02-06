import Elysia, { error } from "elysia"
import { _restaurantReview } from "../types/review.type"
import { AuthMiddleWare } from "../middlewares/auth.middleware"
import { UUID } from "mongodb"
import { reviewService } from "../services/review.service"

const reviews: Record<string, any> = {}
export const reviewsController = new Elysia({
  prefix: "api/reviews"
})
  .use(AuthMiddleWare)
  .get("/", () => Object.values(reviews))
  .get("/:id", ({ params }) => {
    const review = reviews[params.id]
    return review ? review : { error: "Review not found" }
  })

  .get("/", () => reviewService.getAllReviews()) // ดึงรีวิวทั้งหมด

  .post("/", ({ body }) => {
    const id = new UUID().toString()
    const { id: _, ...restBody } = body
    const newReview = {
      id,
      ...restBody,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    reviews[id] = newReview
    return { message: "Review added", review: newReview }
  }, { body: _restaurantReview })

  .post(
    "/",
    ({ body }) => {     // เพิ่มรีวิวใหม่
      const newReview = reviewService.createReview(body)
      return { message: "Review added", review: newReview }
    },
    { body: _restaurantReview }
  )

  .put("/:id", ({ params, body }) => {
    if (!reviews[params.id]) return { error: "Review not found" }

    reviews[params.id] = {
      ...reviews[params.id],
      ...body,
      updated_at: new Date().toISOString(),
    }
    return { message: "Review updated", review: reviews[params.id] }
  }, { body: _restaurantReview })


  .delete("/:id", ({ params }) => {
    if (!reviews[params.id]) return { error: "Review not found" }

    delete reviews[params.id]
    return { message: "Review deleted" }
  });

