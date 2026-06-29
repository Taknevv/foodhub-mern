import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import Layout from "../components/common/Layout";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form);
      toast.success("Account created!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <button className="w-full bg-orange-500 text-white py-3 rounded-lg">
            Register
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-600">
            Login
          </Link>
        </p>
      </div>
    </Layout>
  );
}