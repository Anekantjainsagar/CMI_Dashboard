"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BACKEND_URI } from "./Utils/urls";
import { setCookie } from "cookies-next";
import Context from "./Context/Context";

const App = () => {
  const { getMainData } = useContext(Context);
  const [user, setUser] = useState({ email: "", password: "" });
  const history = useRouter();

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="w-[25vw] border px-5 py-3 border-aquaGreen rounded-lg flex flex-col">
        <h1 className="text-3xl text-center text-aquaGreen font-semibold">
          Login Now
        </h1>
        <div className="w-full">
          <label htmlFor="email" className="block mb-2 text-gray-900">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={user?.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none bg-white text-gray-900 placeholder-gray-500 text-lg"
            placeholder="Enter your email"
          />
        </div>
        <PasswordInput user={user} setUser={setUser} />
        <button
          onClick={() => {
            if (user?.email && user?.password) {
              axios
                .post(
                  `${BACKEND_URI}/auth/login`,
                  {
                    username: user?.email,
                    password: user?.password,
                  },
                  {
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                  }
                )
                .then((res) => {
                  if (res.status == 200 && res.data.access_token) {
                    setCookie("token", res.data.access_token);
                    toast.success("Login Successfully");
                    getMainData();
                    history.push("/dashboard");
                  }
                  if (res.status == 200) {
                    console.log(Object.keys(res.data));
                    console.log(res.data);
                    console.log(res.data[Object.keys(res.data)[0]]);
                    toast.error(res.data[Object.keys(res.data)[0]]);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              toast.error("Please fill all the details");
            }
          }}
          className="bg-aquaGreen transition-all px-10 py-1.5 rounded-lg mt-5 text-xl text-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const PasswordInput = ({ user, setUser }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle password visibility
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="w-full mt-4">
      <label htmlFor="password" className="block mb-2 text-gray-900">
        Password
      </label>
      <div className="relative">
        <input
          id="password"
          value={user?.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type={isVisible ? "text" : "password"}
          className="w-full py-2 pl-4 pr-10 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none bg-white text-gray-900 placeholder-gray-500 text-lg"
          placeholder="Enter your password"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 dark:text-gray-400"
          onClick={toggleVisibility}
        >
          {isVisible ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
};

export default App;
