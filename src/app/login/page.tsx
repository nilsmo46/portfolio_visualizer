"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { baseURL } from "@/constants";

interface LoginFormInputs {
  email: string;
  password: string;
  staySignedIn: boolean;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
        const res = await axios.post(`${baseURL}/auth/login`, {
          email: data.email,
          password: data.password
        })
        console.log(res.data);
        localStorage.setItem("token", res.data)
        router.push("/analysis")
      } catch (error) {
        console.log(error);
        localStorage.setItem("token", "")
      }
  };

      useEffect(() => {
            async function verifyLogin() {
                const token = localStorage.getItem("token");
                if (token) {
                  setLoading(true)
                    try {
                        const res = await axios.get(`${baseURL}/auth/verify`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        if (res.data) {
                            router.push("/analysis");
                        }
                    } catch (error) {
                        console.error("Verification failed:", error);
                        // localStorage.removeItem("token");
                    } finally {
                      setLoading(false)
                    }
                }
            }
            verifyLogin();
        }, [router]);

    if (loading) {
        return (
          <>
            <Loader customMessage="Please wait while we verify your credentials" />
          </>
        )
    }

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-6 rounded-xs">
      <h1 className="text-left text-2xl sm:text-3xl font-bold mb-4">Login to Portfolio Visualizer</h1>
      <div className="bg-[#e2e7f2] h-1"></div>
      <p className="text-xs sm:text-sm mb-4">
        Please enter your login information to sign in below. If you do not already have an account, you can{" "}
        <Link href="/signup" className="text-blue-600 hover:underline">sign up</Link> for a free trial to enable all features.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <div className="bg-[#2b1bfe] text-white p-2 rounded-t">
            <span className="font-medium">Login Information</span>
        </div>

        <div className="border border-gray-300 p-3 sm:p-6 rounded-b flex flex-col space-y-4">
            {/* Email Field */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full">
                <label htmlFor="email" className="block font-medium mb-1 sm:mb-0">Email</label>
                <div className="w-full sm:w-[90%]">
                  <Input
                      id="email"
                      type="email"
                      {...register("email", { required: "Email is required" })}
                      placeholder="Email address"
                      className="w-full sm:w-[90%]"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1 ml-2">{errors.email.message}</p>}
                </div>
            </div>
            
            {/* Password Field */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full">
                <label htmlFor="password" className="block font-medium mb-1 sm:mb-0">Password</label>
                <div className="w-full sm:w-[90%]">
                  <Input
                      id="password"
                      type="password"
                      {...register("password", { required: "Password is required" })}
                      placeholder="Password"
                      className="w-full sm:w-[90%]"
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1 ml-2">{errors.password.message}</p>}
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full">
              <div className="w-full sm:w-[90%] sm:ml-auto">
                <div className="flex flex-col md:flex-row items-start xs:items-center justify-start mb-2 gap-2 xs:gap-4">
                  <div className="flex items-center">
                      <input id="staySignedIn" type="checkbox" {...register("staySignedIn")} className="mr-2" />
                      <label htmlFor="staySignedIn" className="text-xs sm:text-sm">Stay signed in on this device?</label>
                  </div>
                  <Link href="#" className="text-blue-600 text-xs sm:text-sm hover:underline">Forgot password?</Link>
                </div>
                <Button type="submit" className="w-24 hover:bg-blue-700 py-1 text-xs">
                    Login
                </Button>
              </div>
            </div>
            <div className="bg-gray-200 p-2 text-xs sm:text-sm rounded mt-2">
              Don&apos;t have an account? <Link href="/signup" className="text-blue-600 hover:underline">Start your free trial »</Link>
            </div>
        </div>
      </form>
    </div>
  );
};

export default Login;