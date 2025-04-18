import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const loginSchema = z.object({
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Email is invalid" }),
    password: z.string().min(6, { message: "Minimum 6 characters rquired" }),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (d) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/login/",
        d
      );
      console.log("Login successful:", response.data);

      localStorage.setItem("userData", JSON.stringify(response?.data));
      reset();

      if (response.data.user.user_type === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/civilian");
      }
      
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.detail ||
          "An error occurred"
      );
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 text-white p-6">
      <div className="max-w-lg w-full bg-gray-900 p-12 rounded-2xl shadow-2xl border border-gray-800">
        <h2 className="text-4xl font-extrabold text-center mb-8">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded-xl bg-gray-800 focus:outline-none"
            required
            {...register("email")}
          />
          {errors?.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded-xl bg-gray-800 focus:outline-none"
            {...register("password")}
          />
          {errors?.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition shadow-lg w-full"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <p className="text-center text-gray-400 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
