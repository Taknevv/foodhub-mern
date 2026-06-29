import { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import FoodCard from "../components/food/FoodCard";
import api from "../services/api";

export default function Favorites() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const res = await api.get("/users/favorites");
      setFoods(res.data.foods);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-8">
          My Favorites
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : foods.length === 0 ? (
          <p>No favorite foods yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foods.map((food) => (
              <FoodCard
                key={food._id}
                {...food}
              />
            ))}
          </div>
        )}

      </div>
    </Layout>
  );
}