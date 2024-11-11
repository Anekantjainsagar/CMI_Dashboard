"use client";
import { BACKEND_URI } from "@/app/Utils/urls";
import Context from "./Context";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";

const State = ({ children }) => {
  const [mainData, setMainData] = useState();
  const [search_text, setSearch_text] = useState("");

  const getMainData = (page = 1, order_by = "invoice_date", type = "desc") => {
    console.log("Request sent");
    let cookie = getCookie("token");
    let limit = mainData?.limit ? mainData?.limit : 8;

    if (cookie?.length > 5) {
      try {
        axios
          .get(
            `${BACKEND_URI}/data/search?page=${page}&page_size=${limit}&sort_by=${order_by}&sort_order=${type}&search_text=${search_text}`,
            {
              headers: {
                // Authorization: `Bearer ${cookie}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            if (res.data?.data?.length > 0) {
              setMainData(res.data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    console.log("Request sent");
    getMainData();
  }, [search_text]);

  return (
    <Context.Provider
      value={{ mainData, getMainData, search_text, setSearch_text }}
    >
      {children}
    </Context.Provider>
  );
};

export default State;
