import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaClock,
  FaStar,
  FaPhoneAlt,
} from "react-icons/fa";

import api from "../../services/api"; // IMPORTANT for future favorites API

export default function FoodCard({
  _id,
  title,
  price,
  image,
  rating,
  seller,
  location,
  phone,
  featured,
  createdAt,
}) {
  const [liked, setLiked] = useState(false);

  const postedDate = createdAt
    ? new Date(createdAt).toLocaleDateString()
    : "Recently";

  // ✅ Toggle favorite (backend connected)
  const handleFavorite = async () => {
    try {
      setLiked((prev) => !prev);
      await api.post(`/users/favorite/${_id}`);
    } catch (err) {
      console.log("Favorite error:", err.message);
    }
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2">

      {/* IMAGE */}
      <div className="relative overflow-hidden">

        <img
          src={
            image ||
            "https://via.placeholder.com/500x350?text=No+Image"
          }
          alt={title}
          className="h-60 w-full object-cover group-hover:scale-110 transition duration-500"
        />

        {price > 300 && (
          <span className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            🔥 Featured
          </span>
        )}

        {/* ❤️ FAVORITE BUTTON */}
        <button
          onClick={handleFavorite}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            liked
              ? "bg-red-500 text-white scale-110"
              : "bg-white text-red-500 hover:scale-110"
          }`}
        >
          <FaHeart />
        </button>

      </div>

      {/* CONTENT */}
      <div className="p-5">

        <div className="flex justify-between items-center">

          <h2 className="text-xl font-bold dark:text-white">
            {title}
          </h2>

          <span className="text-orange-600 font-bold text-xl">
            ₹{price}
          </span>

        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-3 text-yellow-500">
          <FaStar />
          <span className="font-semibold">
            {rating || "4.8"}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 mt-3 text-gray-600 dark:text-gray-300">
          <FaMapMarkerAlt />
          {location}
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-300">
          <FaClock />
          {postedDate}
        </div>

        {/* Seller */}
        <div className="mt-4">
          <span className="font-semibold text-orange-500">
            Seller:
          </span>{" "}
          <span className="dark:text-white">
            {seller}
          </span>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 mt-6">

          <Link
            to={`/foods/${_id}`}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl transition text-center"
          >
            View Details
          </Link>

          <a
            href={`tel:${phone?.replace(/\s/g, "")}`}
            className="bg-green-600 hover:bg-green-700 text-white px-5 rounded-xl flex items-center justify-center transition"
          >
            <FaPhoneAlt />
          </a>

        </div>

      </div>
    </div>
  );
}