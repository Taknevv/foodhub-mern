import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/common/Layout";
import FoodCard from "../components/food/FoodCard";
import api from "../services/api";

export default function SellerProfile() {
  const { id } = useParams();

  const [seller, setSeller] = useState(null);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSeller();
  }, [id]);

  const fetchSeller = async () => {
    try {
      const res = await api.get(`/users/${id}`);

      setSeller(res.data.seller);
      setFoods(res.data.foods);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-20 text-2xl">
          Loading Seller...
        </div>
      </Layout>
    );
  }

  if (!seller) {
    return (
      <Layout>
        <div className="text-center py-20 text-red-500 text-2xl">
          Seller not found
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">

          <h1 className="text-4xl font-bold text-orange-600">
            👤 {seller.username}
          </h1>

          <p className="mt-3 text-gray-600">
            📧 {seller.email}
          </p>

          <p className="mt-2 font-semibold">
            Total Listings: {foods.length}
          </p>

        </div>

        <h2 className="text-3xl font-bold mb-8">
          Foods by {seller.username}
        </h2>

        {foods.length === 0 ? (
          <p>No foods posted.</p>
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