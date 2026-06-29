import { useState } from "react";
import toast from "react-hot-toast";

import api from "../../services/api";

export default function AddReview({
  foodId,
  onReviewAdded,
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(`/reviews/${foodId}`, {
        rating,
        comment,
      });

      toast.success("Review added!");

      setRating(5);
      setComment("");

      onReviewAdded();

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to add review"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 mt-8"
    >

      <h3 className="text-2xl font-bold">
        Write a Review
      </h3>

      <select
        value={rating}
        onChange={(e) =>
          setRating(Number(e.target.value))
        }
        className="border rounded-lg p-3 w-full"
      >
        {[5, 4, 3, 2, 1].map((num) => (
          <option
            key={num}
            value={num}
          >
            {num} Star
          </option>
        ))}
      </select>

      <textarea
        rows="4"
        placeholder="Write your review..."
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
        className="border rounded-lg p-3 w-full"
      />

      <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg">
        Submit Review
      </button>

    </form>
  );
}