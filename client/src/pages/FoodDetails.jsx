import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/common/Layout";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaStar,
  FaWhatsapp,
} from "react-icons/fa";

export default function FoodDetails() {
  const { id } = useParams();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFood();
  }, [id]);

  const fetchFood = async () => {
    try {
      const res = await api.get(`/foods/${id}`);
      setFood(res.data.food);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-20 text-xl">Loading...</div>
      </Layout>
    );
  }

  if (!food) {
    return (
      <Layout>
        <div className="text-center py-20 text-red-500">
          Food not found
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-6 py-10">

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">

          {/* IMAGE */}
          <img
            src={food.image}
            alt={food.title}
            className="w-full h-96 object-cover"
          />

          {/* CONTENT */}
          <div className="p-8">

            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold dark:text-white">
                {food.title}
              </h1>

              <span className="text-2xl text-orange-600 font-bold">
                ₹{food.price}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-3 text-yellow-500">
              <FaStar />
              4.8 Rating
            </div>

            <p className="mt-5 text-gray-600 dark:text-gray-300">
              {food.description}
            </p>

            <div className="mt-5 flex items-center gap-2">
              <FaMapMarkerAlt />
              {food.location}
            </div>

            {/* SELLER */}
            <div className="mt-6">
              <h3 className="font-semibold text-orange-500">
                Seller Details
              </h3>
              <Link
                to={`/seller/${food.user?._id}`}
                className="text-orange-600 hover:underline"
              >
                👤 {food.seller}
              </Link>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 mt-8">

              <a
                href={`tel:${food.phone}`}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <FaPhoneAlt />
                Call
              </a>

              <a
                href={`https://wa.me/${food.phone}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <FaWhatsapp />
                WhatsApp
              </a>

            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}