import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../services/api";
import Layout from "../components/common/Layout";
import { useAuth } from "../context/AuthContext";

export default function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
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

      const res = await api.post("/users/login", form);

      login(res.data.user, res.data.token);

      toast.success("Login Successful!");

      navigate("/");

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Login Failed"
      );

    }
  };

  return (
    <Layout>

      <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <button
            className="w-full bg-orange-500 text-white py-3 rounded-lg"
          >
            Login
          </button>

        </form>

        <p className="mt-6 text-center">
          Don't have an account?

          <Link
            to="/register"
            className="text-orange-600 ml-2"
          >
            Register
          </Link>

        </p>

      </div>

    </Layout>
  );
}