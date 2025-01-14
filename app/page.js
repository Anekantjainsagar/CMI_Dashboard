"use client";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import Context from "./Context/Context";
import { setCookie } from "cookies-next";
import { BACKEND_URI } from "./Utils/urls";
import { useRouter } from "next/navigation";
import { MdEmail, MdLock } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useContext, useState } from "react";

const App = () => {
  const { getMainData } = useContext(Context);
  const [user, setUser] = useState({ email: "", password: "" });
  const history = useRouter();

  return (
    <div className="flex items-center relative justify-center h-[100vh]">
      {/* <div className="flex items-center absolute top-5 left-5">
        <div className="flex items-center cursor-pointer">
          <Image
            src="/logo.png"
            alt="Logo"
            width={1000}
            height={1000}
            className="w-[3vw] cursor-pointer"
          />
          <h2 className="text-2xl font-semibold ml-3">Invoice Summary</h2>
        </div>
      </div> */}
      <div className="w-[24vw] shadow-md shadow-aquaGreen px-7 py-8 rounded-3xl flex flex-col items-center justify-between">
        <Image
          src="/logo.png"
          alt="Logo"
          width={1000}
          height={1000}
          className="w-[6vw] cursor-pointer my-6"
        />
        <div className="w-full">
          <h1 className="text-4xl text-center text-black font-[700]">Login</h1>
          {/* <p className="text-gray-500 text-center w-10/12 mx-auto text-lg my-2">
            Enter your email address & password to login into the CMI Portal
          </p> */}
          <div className="w-full mt-6 relative">
            <MdEmail className="absolute left-4 text-gray-400 top-1/2 -translate-y-1/2 text-2xl" />
            <input
              id="email"
              type="email"
              value={user?.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full py-3 pl-14 pr-4 bg-gray-200/50 rounded-lg text-lg text-gray-700/70 placeholder-gray-500 outline-none"
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
                    console.log(res.data);
                    if (res.status == 200) {
                      if (res.data.access_token) {
                        setCookie("token", res.data.access_token);
                        toast.success("Login Successfully");
                        getMainData();
                        history.push("/dashboard");
                      } else {
                        console.log(res.data[Object.keys(res.data)[0]]);
                        toast.error(res.data[Object.keys(res.data)[0]]);
                      }
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                toast.error("Please fill all the details");
              }
            }}
            className="bg-aquaGreen w-full transition-all px-10 py-2 rounded-lg mt-5 font-semibold text-xl text-white"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

const PasswordInput = ({ user, setUser }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="w-full mt-4">
      <div className="relative">
        <MdLock className="absolute left-4 text-gray-400 top-1/2 -translate-y-1/2 text-2xl" />
        <input
          id="password"
          value={user?.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type={isVisible ? "text" : "password"}
          className="w-full py-3 px-14 bg-gray-200/50 text-lg rounded-lg text-gray-700/70 placeholder-gray-500 outline-none"
          placeholder="Enter your password"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 text-xl flex items-center pr-4 text-gray-400"
          onClick={toggleVisibility}
        >
          {isVisible ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
};

export default App;
