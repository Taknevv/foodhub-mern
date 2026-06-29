import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/common/Layout";
import toast from "react-hot-toast";

export default function SellFood() {
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
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 📸 CLOUDINARY UPLOAD (FIXED + SAFE)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);

      const res = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // ✅ SAFE fallback (handles different backend responses)
      const imageUrl =
        res.data.imageUrl ||
        res.data.url ||
        res.data.secure_url;

      if (!imageUrl) {
        throw new Error("No image URL returned from server");
      }

      setForm((prev) => ({
        ...prev,
        image: imageUrl,
      }));

      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/foods", form);

      toast.success("Food Added Successfully 🍕");

      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-16">
        <div className="bg-white rounded-3xl shadow-xl p-10">

          <h1 className="text-4xl font-bold text-center text-orange-600 mb-8">
            🍕 Sell Your Food
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              name="title"
              placeholder="Food Name"
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              required
            />

            <input
              name="price"
              type="number"
              placeholder="Price"
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              required
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              required
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
              placeholder="Seller Name"
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              required
            />

            <input
              name="location"
              placeholder="Location"
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              required
            />

            <input
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              required
            />

            <textarea
              name="description"
              placeholder="Food Description"
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              rows="4"
              required
            />

            {/* IMAGE UPLOAD */}
            <div className="border p-4 rounded-xl">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full"
              />

              {uploading && (
                <p className="text-blue-500 mt-2">
                  Uploading image...
                </p>
              )}
            </div>

            {/* PREVIEW */}
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="rounded-xl h-56 w-full object-cover"
              />
            )}

            <button
              disabled={loading || uploading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold"
            >
              {loading ? "Adding..." : "Add Food"}
            </button>

          </form>

        </div>
      </div>
    </Layout>
  );
}