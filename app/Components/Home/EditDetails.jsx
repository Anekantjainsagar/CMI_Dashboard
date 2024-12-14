"use client";
import Context from "@/app/Context/Context";
import { BACKEND_URI } from "@/app/Utils/urls";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";

const EditDetails = ({ data, setShowSubscribe }) => {
  const [show, setShow] = useState(0);

  return (
    <div className="w-full">
      <h4 className="font-medium text-xl">Edit Details</h4>
      {data?.items[0]?.data &&
        data?.items[0]?.data?.map((e, i) => {
          return (
            <Block
              data={e}
              key={i}
              i={i}
              show={show}
              setShow={setShow}
              setShowSubscribe={setShowSubscribe}
            />
          );
        })}
    </div>
  );
};

const fieldNames = [
  "hs_code",
  "amount_usd",
  "product_id",
  "num_cartons",
  "loading_date",
  "product_name",
  "delivery_date",
  "delivery_terms",
  "seller_address",
  "unit_price_usd",
  "product_quantity",
  "means_of_transport",
  "quantity_per_carton",
];

const Block = ({ data, i, show, setShow, setShowSubscribe }) => {
  const { getMainData } = useContext(Context);
  const [mainData, setMainData] = useState({
    hs_code: "",
    amount_usd: "",
    product_id: "",
    num_cartons: "",
    loading_date: "",
    product_name: "",
    delivery_date: "",
    delivery_terms: "",
    seller_address: "",
    unit_price_usd: "",
    product_quantity: "",
    means_of_transport: "",
    quantity_per_carton: "",
  });

  useEffect(() => {
    if (data) {
      const updatedData = {};
      fieldNames.forEach((field) => {
        updatedData[field] = data[field] || ""; // Use value from `data`, or default to empty string
      });
      setMainData(updatedData);
    }
  }, [data]);

  const handleChange = (e, key) => {
    setMainData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    const updatedFields = Object.keys(mainData).reduce((acc, key) => {
      acc[key] = mainData[key]; // Assign the value from mainData
      return acc;
    }, {});

    axios
      .put(`${BACKEND_URI}/data/data/row?id=${data?.id}`, updatedFields, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success(
            `${mainData?.product_name} Product Updated Successfully`
          );
          setShowSubscribe(false);
          getMainData();
        }
      })
      .catch((error) => console.error("API Error:", error));
  };

  return (
    <div>
      <div
        onClick={() => {
          setShow(i);
        }}
        className={`flex items-center w-full justify-between text-base cursor-pointer px-2.5 pt-1.5 hover:bg-gray-300/40 ${
          i === show
            ? "bg-gray-300/40 border-b border-b-gray-700/70 pb-3"
            : "pb-1.5"
        } rounded-sm transition-all`}
      >
        <p className="text-[18px]">
          {i + 1}. {data?.product_name}
        </p>
        {i != show ? <AiOutlineRight /> : <AiOutlineDown />}
      </div>
      {show === i && (
        <div>
          {fieldNames.map((field) => (
            <div key={field} className="bg-gray-300/40 px-2.5">
              <div className="flex items-center text-base py-2 justify-between">
                <p className="w-3/12 text-end mr-4 capitalize">
                  {field.replace(/_/g, " ")}
                </p>
                <input
                  type="text"
                  placeholder={`Enter ${field.replace(/_/g, " ")}`}
                  value={mainData[field]}
                  onChange={(e) => handleChange(e, field)}
                  className="bg-transparent w-9/12 py-1 border border-gray-700 px-4 rounded-md outline-none"
                />
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between bg-gray-300/40 px-2 py-2 w-full">
            <p></p>
            <button
              onClick={handleSubmit}
              className="bg-aquaGreen text-base font-semibold text-white py-1.5 px-5 rounded-lg"
            >
              Update Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditDetails;
