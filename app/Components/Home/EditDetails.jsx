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
    <div className="w-full max-h-[36vh] overflow-y-auto small-scroller pb-5 border border-[#242731]/30 rounded-lg p-1">
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
        className={`flex items-center w-full justify-between text-base cursor-pointer px-2 pt-1.5 ${
          i === show ? "border-b border-b-[#242731]/30 pb-3" : "pb-1.5"
        } rounded-sm transition-all`}
      >
        <p className="text-[18px] text-[#242731] mb-0">
          {i + 1}. {data?.product_name}
        </p>
        {i != show ? <AiOutlineRight /> : <AiOutlineDown />}
      </div>
      {show === i && (
        <div className="px-2">
          {fieldNames.map((field) => (
            <div key={field} className="w-full">
              <div className="text-base py-2 justify-between">
                <p className="capitalize mb-1 text-[#242731]">
                  {field.replace(/_/g, " ")}
                </p>
                <input
                  type="text"
                  placeholder={`Enter ${field.replace(/_/g, " ")}`}
                  value={mainData[field]}
                  onChange={(e) => handleChange(e, field)}
                  className="bg-transparent w-full py-1 border text-[#242731]/80 border-[#242731]/30 px-3 rounded-md outline-none"
                />
              </div>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="bg-aquaGreen text-base font-semibold text-white py-1.5 mt-2 mb-3 w-full rounded-lg"
          >
            Update Details
          </button>
        </div>
      )}
    </div>
  );
};

export default EditDetails;
