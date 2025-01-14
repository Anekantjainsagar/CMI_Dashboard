"use client";
import axios from "axios";
import Context from "./Context";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { BACKEND_URI } from "@/app/Utils/urls";

const State = ({ children }) => {
  const [mainData, setMainData] = useState();
  const [search_text, setSearch_text] = useState("");
  const [allData, setAllData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const getMainData = (page = 1, order_by = "invoice_date", type = "desc") => {
    let cookie = getCookie("token");

    if (cookie?.length > 5) {
      try {
        axios
          .get(
            `${BACKEND_URI}/data/search?page=${page}&page_size=8&sort_by=${order_by}&sort_order=${type}&search_text=${search_text}&min_date=${
              startDate ? new Date(startDate).toISOString() : ""
            }&max_date=${endDate ? new Date(endDate).toISOString() : ""}`,
            {
              headers: {
                Authorization: `Bearer ${cookie}`,
              },
            }
          )
          .then((res) => {
            setMainData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getFullData = () => {
    let cookie = getCookie("token");

    if (cookie?.length > 5 && mainData) {
      try {
        axios
          .get(
            `${BACKEND_URI}/data/search?page=1&page_size=${
              mainData?.total_records
            }&sort_by=${"invoice_date"}&sort_order=${"desc"}&search_text=${""}&min_date=${
              startDate ? new Date(startDate).toISOString() : ""
            }&max_date=${endDate ? new Date(endDate).toISOString() : ""}`,
            {
              headers: {
                Authorization: `Bearer ${cookie}`,
              },
            }
          )
          .then((res) => {
            setAllData(res.data.data);
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
    getMainData();
  }, [search_text, startDate, endDate]);

  useEffect(() => {
    getFullData();
  }, [mainData]);

  return (
    <Context.Provider
      value={{
        mainData,
        getMainData,
        search_text,
        setSearch_text,
        allData,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default State;
