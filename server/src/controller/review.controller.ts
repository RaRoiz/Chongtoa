import Elysia from "elysia";
import { _restaurantReview } from "../types/review.type";
import { AuthMiddleWare } from "../middlewares/auth.middleware";
import { reviewService } from "../services/review.service";

export const reviewsController = new Elysia({
  prefix: "api/reviews",
  tags: ["Reviews"],
})
  .use(AuthMiddleWare)

  .get("/", () => reviewService.getAllReviews()) // ดึงรีวิวทั้งหมด

  .get("/:id", ({ params }) => {    // ดึงรีวิวตาม ID
    const review = reviewService.getReviewById(params.id);
    return review || { error: "Review not found" };
  })

  .post(
    "/",
    ({ body }) => {     // เพิ่มรีวิวใหม่
      const newReview = reviewService.createReview(body);
      return { message: "Review added", review: newReview };
    },
    { body: _restaurantReview }
  )

  .put(
    "/:id",
    ({ params, body }) => {  // อัปเดตรีวิว
      const updatedReview = reviewService.updateReview(params.id, body);
      return updatedReview
        ? { message: "Review updated", review: updatedReview }
        : { error: "Review not found" };
    },
    { body: _restaurantReview }
  )

  .delete("/:id", ({ params }) => {     // ลบรีวิว
    return reviewService.deleteReview(params.id)
      ? { message: "Review deleted" }
      : { error: "Review not found" };
  });
    