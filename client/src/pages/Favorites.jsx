import { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import api from "../services/api";
import FoodCard from "../components/food/FoodCard";
import toast from "react-hot-toast";

export default function Favorites() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetchFav();
  }, []);

  const fetchFav = async () => {
    try {
      const res = await api.get("/users/favorites");
      setFoods(res.data.favorites);
    } catch (err) {
      toast.error("Failed to load favorites");
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-8">
          ❤️ My Favorites
        </h1>

        {foods.length === 0 ? (
          <p className="text-gray-500">No favorites yet</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foods.map((food) => (
              <FoodCard key={food._id} {...food} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}