import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const registrationSchema = z
  .object({
    first_name: z.string().min(2, "First Name is required"),
    last_name: z.string().min(2, "Last Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
    address: z.string().min(5, "Address is required"),
    role: z.enum(["CIVILIAN", "ADMIN"], "Select a valid role"),
    idProofType: z.string().min(3, "ID Proof Type is required"),
    idProofFile: z.any().refine((file) => file.length > 0, "File is required"),

    // Conditional fields for Authority
    authorityPosition: z.string().optional(),
    governmentId: z.string().optional(),
    departmentName: z.string().optional(),
    workLocation: z.string().optional(),

    occupation: z.string().optional(),
    password: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
  })
  .refine(
    (data) => {
      if (data.role === "Authority") {
        return data.governmentId && data.departmentName && data.workLocation;
      }
      return true;
    },
    { message: "Authority fields are required", path: ["governmentId"] }
  );

const Registration = () => {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (d) => {
    console.log("Registration Data:", d);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/register/",
        d
      );
      console.log("Register successful:", response.data);
      toast.success("Registered Successfully");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      reset();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.detail ||
          "An error occurred"
      );
      console.error("Registeration failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 text-white p-6">
      <div className="max-w-5xl w-full bg-gray-900 p-10 rounded-2xl shadow-2xl border border-gray-800">
        <h2 className="text-4xl font-extrabold text-center mb-8">Register</h2>

        <form
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <input
              {...register("first_name")}
              type="text"
              placeholder="First Name"
              className="input px-4 py-2 rounded-xl bg-gray-800 focus-within:outline-0 w-full"
            />
            {errors.first_name && (
              <p className="text-red-500">{errors.first_name.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("last_name")}
              type="text"
              placeholder="Last Name"
              className="input px-4 py-2 rounded-xl bg-gray-800 focus-within:outline-0 w-full"
            />
            {errors.last_name && (
              <p className="text-red-500">{errors.last_name.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="input px-4 py-2 rounded-xl bg-gray-800 focus-within:outline-0 w-full"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("phone")}
              type="tel"
              placeholder="Phone"
              className="input px-4 py-2 rounded-xl bg-gray-800 focus-within:outline-0 w-full"
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("address")}
              type="text"
              placeholder="Address"
              className="input px-4 py-2 rounded-xl bg-gray-800 focus-within:outline-0 w-full"
            />
            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}
          </div>

          <div>
            <select
              {...register("role")}
              className="input px-2 py-2 rounded-xl bg-gray-800 focus-within:outline-0 w-full"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="CIVILIAN">Civilian</option>
              <option value="ADMIN">Village Authority Admin</option>
            </select>
            {errors.role && (
              <p className="text-red-500">{errors.role.message}</p>
            )}
          </div>

          <div>
            <select
              {...register("idProofType")}
              className="input px-2 py-2 rounded-xl bg-gray-800 focus-within:outline-0 w-full"
            >
              <option value="">Select ID Proof Type</option>
              <option value="PAN Card">PAN Card</option>
              <option value="Voter ID">Voter ID</option>
              <option value="Passport">Passport</option>
              <option value="Ration Card">Ration Card</option>
              <option value="Driving License">Driving License</option>
              <option value="Other">Other</option>
            </select>
            {errors.idProofType && (
              <p className="text-red-500">{errors.idProofType.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("idProofFile")}
              type="file"
              className="input file-type px-4 py-2 rounded-xl bg-gray-800 focus-within:outline-0 w-full"
            />
            {errors.idProofFile && (
              <p className="text-red-500">{errors.idProofFile.message}</p>
            )}
          </div>

          {role === "ADMIN" && (
            <>
              <div>
                <input
                  {...register("authorityPosition")}
                  type="text"
                  placeholder="Authority Position"
                  className="input px-4 py-2 rounded-xl bg-gray-800 focus-within:outline-0 w-full"
                />
              </div>

              <div>
                <input
                  {...register("governmentId")}
                  type="text"
                  placeholder="Government ID"
                  className="input px-4 py-2 rounded-xl bg-gray-800 focus-within:outline-0 w-full"
                />
                {errors.governmentId && (
                  <p className="text-red-500">{errors.governmentId.message}</p>
                )}
              </div>

              <div>
                <input
                  {...register("departmentName")}
                  type="text"
                  placeholder="Department Name"
                  className="input px-4 py-2 rounded-xl bg-gray-800 focus-within:outline-0 w-full"
                />
                {errors.departmentName && (
                  <p className="text-red-500">
                    {errors.departmentName.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  {...register("workLocation")}
                  type="text"
                  placeholder="Work Location"
                  className="input px-4 py-2 rounded-xl bg-gray-800 focus-within:outline-0 w-full"
                />
                {errors.workLocation && (
                  <p className="text-red-500">{errors.workLocation.message}</p>
                )}
              </div>
            </>
          )}

          {role === "CIVILIAN" && (
            <div>
              <input
                {...register("occupation")}
                type="text"
                placeholder="Occupation"
                className="input px-4 py-2 rounded-xl bg-gray-800 focus-within:outline-0 w-full"
              />
            </div>
          )}

          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="input px-4 py-2 rounded-xl bg-gray-800 focus-within:outline-0 w-full"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition shadow-lg"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Registration;
