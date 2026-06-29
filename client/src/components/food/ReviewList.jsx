import { FaStar } from "react-icons/fa";

export default function ReviewList({ reviews }) {
  if (reviews.length === 0) {
    return (
      <p className="text-gray-500">
        No reviews yet.
      </p>
    );
  }

  return (
    <div className="space-y-6">

      {reviews.map((review) => (
        <div
          key={review._id}
          className="border rounded-xl p-4 bg-white dark:bg-gray-800"
        >
          <div className="flex justify-between items-center">

            <h3 className="font-semibold text-orange-600">
              {review.username}
            </h3>

            <div className="flex items-center gap-1 text-yellow-500">
              <FaStar />
              {review.rating}
            </div>

          </div>

          <p className="mt-3 text-gray-700 dark:text-gray-300">
            {review.comment}
          </p>

          <p className="mt-2 text-xs text-gray-500">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>

        </div>
      ))}

    </div>
  );
}