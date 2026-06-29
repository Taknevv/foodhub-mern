import { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import FoodCard from "../components/food/FoodCard";
import api from "../services/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function MyListings() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyFoods();
  }, []);

  const fetchMyFoods = async () => {
    try {
      const res = await api.get("/foods/my-listings");
      setFoods(res.data.foods);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load listings"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this food?"
    );

    if (!confirmDelete) return;

    try {
      const res = await api.delete(`/foods/${id}`);

      toast.success(res.data.message);

      // refresh list
      fetchMyFoods();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Delete failed"
      );
    }
  };

  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-8">
          My Listings
        </h1>

        {loading ? (
          <div className="text-center text-xl">
            Loading...
          </div>
        ) : foods.length === 0 ? (
          <div className="text-center text-xl text-gray-500">
            You haven't added any food listings yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {foods.map((food) => (

              <div key={food._id} className="bg-white rounded-xl shadow-lg p-4">

                {/* Food Card */}
                <FoodCard {...food} />

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">

                  <Link
                    to={`/edit-food/${food._id}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-center flex items-center justify-center"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(food._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </section>
    </Layout>
  );
}