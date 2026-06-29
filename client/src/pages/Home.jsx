import { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import CategoryCard from "../components/food/CategoryCard";
import FoodCard from "../components/food/FoodCard";
import api from "../services/api";

export default function Home() {
  const categories = [
    { emoji: "🍕", title: "Pizza" },
    { emoji: "🍔", title: "Burger" },
    { emoji: "🍛", title: "Biryani" },
    { emoji: "🍩", title: "Donuts" },
    { emoji: "🥤", title: "Drinks" },
    { emoji: "🍰", title: "Desserts" },
  ];

  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchFoods();
  }, []);

  useEffect(() => {
    let result = [...foods];

    if (selectedCategory !== "All") {
      result = result.filter(
        (food) =>
          food.category?.toLowerCase() ===
        selectedCategory.toLowerCase()
      );
    }

    if (search.trim() !== "") {
      result = result.filter((food) =>
        food.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredFoods(result);

  }, [foods, search, selectedCategory]);

  const fetchFoods = async () => {
    try {
      const res = await api.get("/foods");

      setFoods(res.data.foods);
      setFilteredFoods(res.data.foods);

    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <Layout>

      {/* Hero */}

      <section
        className="relative h-[85vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-center text-white px-6">

          <span className="bg-orange-500 px-5 py-2 rounded-full font-semibold">
            🍕 India's #1 Food Marketplace
          </span>

          <h1 className="mt-8 text-6xl font-extrabold">
            Discover
            <span className="text-orange-400">
              {" "}
              Delicious Food{" "}
            </span>
            Near You
          </h1>

          <p className="mt-6 text-xl max-w-2xl mx-auto">
            Buy homemade food, restaurant specials and freshly prepared meals directly from trusted sellers.
          </p>

          <div className="mt-10 flex justify-center">

            <div className="backdrop-blur-lg bg-white/20 rounded-2xl p-3 w-full max-w-2xl flex">

              <input
                type="text"
                placeholder="Search Pizza, Burger, Biryani..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent outline-none text-white placeholder-gray-300 px-4"
              />

            </div>

          </div>

          <div className="mt-10 flex justify-center gap-10 flex-wrap">

            <div>
              <h2 className="text-4xl font-bold">
                {foods.length}+
              </h2>
              <p>Foods</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold">
                120+
              </h2>
              <p>Sellers</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold">
                4.9★
              </h2>
              <p>Rating</p>
            </div>

          </div>

        </div>

      </section>

      {/* Categories */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <h2 className="text-4xl font-bold text-center mb-10">
          Browse Categories
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-10">

          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-5 py-2 rounded-full ${
              selectedCategory === "All"
                ? "bg-orange-500 text-white"
                : "bg-gray-200"
            }`}
          >
            All
          </button>

          {categories.map((cat) => (

            <button
              key={cat.title}
              onClick={() => setSelectedCategory(cat.title)}
              className={`px-5 py-2 rounded-full ${
                selectedCategory === cat.title
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {cat.emoji} {cat.title}
            </button>

          ))}

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">

          {categories.map((item) => (
            <CategoryCard
              key={item.title}
              emoji={item.emoji}
              title={item.title}
            />
          ))}

        </div>

      </section>

      {/* Latest Foods */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <h2 className="text-4xl font-bold mb-8">
          Latest Food Listings
        </h2>

        {loading ? (

          <div className="text-center text-2xl">
            Loading Foods...
          </div>

        ) : filteredFoods.length === 0 ? (

          <div className="text-center text-2xl text-gray-500">
            No Food Found
          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredFoods.map((food) => (
              <FoodCard
                key={food._id}
                {...food}
              />
            ))}

          </div>

        )}

      </section>

    </Layout>
  );
}