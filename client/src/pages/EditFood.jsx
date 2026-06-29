import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/common/Layout";
import toast from "react-hot-toast";

export default function EditFood() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    seller: "",
    location: "",
    image: "",
    description: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Load existing food data
  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await api.get(`/foods/${id}`);
        setForm(res.data.food);
      } catch (err) {
        toast.error("Failed to load food");
      } finally {
        setFetching(false);
      }
    };

    fetchFood();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/foods/${id}`, form);

      toast.success("Food Updated Successfully 🍕");
      navigate("/my-listings");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Update failed"
      );
    }

    setLoading(false);
  };

  if (fetching) {
    return (
      <Layout>
        <div className="text-center py-20 text-xl">
          Loading food...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-16">
        <div className="bg-white rounded-3xl shadow-xl p-10">
          <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
            ✏ Edit Food
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              placeholder="Food Name"
            />

            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              placeholder="Price"
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
            >
              <option value="">Select Category</option>
              <option value="Pizza">🍕 Pizza</option>
              <option value="Burger">🍔 Burger</option>
              <option value="Biryani">🍛 Biryani</option>
              <option value="Dessert">🍰 Dessert</option>
              <option value="Drinks">🥤 Drinks</option>
              <option value="Snacks">🍟 Snacks</option>
            </select>

            <input
              name="seller"
              value={form.seller}
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              placeholder="Seller Name"
            />

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              placeholder="Location"
            />

            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              placeholder="Image URL"
            />

            <input
              name="phone"
              value={form.phone || ""}
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              placeholder="Phone Number"
            />

            <textarea
              name="description"
              value={form.description || ""}
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              placeholder="Description"
              rows="4"
            />

            {form.image && (
              <img
                src={form.image}
                alt="preview"
                className="rounded-xl h-56 w-full object-cover"
              />
            )}

            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold"
            >
              {loading ? "Updating..." : "Update Food"}
            </button>

          </form>
        </div>
      </div>
    </Layout>
  );
}