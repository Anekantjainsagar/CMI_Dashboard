"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const App = () => {
  const history = useRouter();

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="w-[30vw] border px-5 py-3 border-aquaGreen rounded-lg flex flex-col">
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
            className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none bg-white text-gray-900 placeholder-gray-500 text-lg"
            placeholder="Enter your email"
          />
        </div>
        <PasswordInput />{" "}
        <button
          onClick={() => {
            history.push("/dashboard");
          }}
          className="bg-aquaGreen transition-all px-10 py-1.5 rounded-lg mt-5 text-xl text-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const PasswordInput = () => {
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
