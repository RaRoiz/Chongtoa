import { v4 as uuidv4 } from "uuid";
import { restaurantReview } from "../types/review.type";

class ReviewService {
  private reviews: Record<string, restaurantReview> = {};

  //  ดึงรีวิวทั้งหมด
  getAllReviews(): restaurantReview[] {
    return Object.values(this.reviews);
  }

  //  ดึงรีวิวตาม ID
  getReviewById(id: string): restaurantReview | null {
    return this.reviews[id] || null;
  }

  //  เพิ่มรีวิวใหม่
  createReview(data: Omit<restaurantReview, "id" | "created_at" | "updated_at">): restaurantReview {
    const id = uuidv4();
    const newReview: restaurantReview = {
      id,
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.reviews[id] = newReview;
    return newReview;
  }

  //  อัปเดตรีวิว
  updateReview(id: string, data: Partial<Omit<restaurantReview, "id" | "created_at">>): restaurantReview | null {
    if (!this.reviews[id]) return null;

    this.reviews[id] = {
      ...this.reviews[id],
      ...data,
      updated_at: new Date(),
    };

    return this.reviews[id];
  }

  // ลบรีวิว
  deleteReview(id: string): boolean {
    if (!this.reviews[id]) return false;
    delete this.reviews[id];
    return true;
  }
}

export const reviewService = new ReviewService();
