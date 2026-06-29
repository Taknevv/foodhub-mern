import {
  FaMapMarkerAlt,
  FaClock,
  FaUser,
  FaPhoneAlt,
  FaTag,
} from "react-icons/fa";

export default function FoodInfo({ food }) {
  const postedDate = food.createdAt
    ? new Date(food.createdAt).toLocaleDateString()
    : "Recently";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">

      <h1 className="text-4xl font-bold dark:text-white">
        {food.title}
      </h1>

      <p className="text-orange-500 text-3xl font-bold mt-4">
        ₹{food.price}
      </p>

      <div className="space-y-4 mt-8">

        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
          <FaTag />
          <span>{food.category}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
          <FaMapMarkerAlt />
          <span>{food.location}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
          <FaClock />
          <span>{postedDate}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
          <FaUser />
          <span>{food.seller?.username || food.seller}</span>
        </div>

      </div>

      <hr className="my-8" />

      <h2 className="font-bold text-xl dark:text-white">
        Description
      </h2>

      <p className="mt-3 text-gray-600 dark:text-gray-300 leading-7">
        {food.description}
      </p>

      <div className="flex gap-4 mt-10">

        <a
          href={`tel:${food.phone}`}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-center transition flex items-center justify-center gap-2"
        >
          <FaPhoneAlt />
          Contact Seller
        </a>

      </div>

    </div>
  );
}