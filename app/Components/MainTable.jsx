"use client";
import { useContext } from "react";
import DetailsBlock from "./Home/DetailsBlock";
import Context from "../Context/Context";
import {
  MdOutlineChevronLeft,
  MdOutlineChevronRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

const MainTable = () => {
  const { getMainData, mainData } = useContext(Context);

  return (
    <div className="px-4 border border-gray-200/5 rounded-2xl">
      <div className="grid bg-[#F8F8F8] mr-3.5 text-[#242731] font-semibold gridNumbers items-center border border-[#D3D4D6] rounded-t-2xl">
        {[
          "Invoice #",
          "Invoice Date",
          "PO #",
          "Seller",
          "Discharge",
          "Origin",
          "Product ID",
          "Product Name",
          "Product Quantity",
          "Unit Price ($)",
          "Product Price ($)",
          "Total Quantity",
          "Total Price ($)",
        ].map((e, i) => {
          return (
            <h5
              key={i}
              className={`text-[13px] min-[1600px]:text-base px-2 h-[6vh] flex items-center justify-center text-center border-r-[#D3D4D6] ${
                i !== 13 && "border-r"
              }`}
            >
              {e}
            </h5>
          );
        })}
      </div>
      <div className="h-[82vh]">
        <div className="overflow-y-auto small-scroller h-[90%] border rounded-b-2xl border-[#D3D4D6]">
          {mainData?.data?.map((e, i) => {
            return <DetailsBlock key={i} data={e} />;
          })}
        </div>
        <div className="flex gap-x-3 items-center justify-center mt-5">
          <MdOutlineKeyboardDoubleArrowLeft
            onClick={() => {
              if (mainData?.current_page != 1) {
                getMainData(1);
              }
            }}
            className={`text-2xl ${
              mainData?.current_page == 1 ? "text-gray-300" : "text-gray-600"
            } cursor-pointer`}
          />
          <MdOutlineChevronLeft
            onClick={() => {
              if (mainData?.current_page != 1) {
                getMainData(mainData?.current_page - 1);
              }
            }}
            className={`text-2xl ${
              mainData?.current_page == 1 ? "text-gray-300" : "text-gray-600"
            } cursor-pointer`}
          />
          {[...Array(mainData?.total_pages).keys()]
            .map((i) => i + 1)
            ?.map((e, i) => {
              return (
                <div
                  className={`w-[30px] min-[1600px]:w-[40px] h-[30px] text-sm min-[1600px]:text-base min-[1600px]:h-[40px] rounded-lg flex items-center justify-center cursor-pointer ${
                    mainData?.current_page == e
                      ? "bg-aquaGreen text-white"
                      : "text-[#85888E] border border-gray-300"
                  }`}
                  key={i}
                  onClick={() => {
                    getMainData(e);
                  }}
                >
                  {e}
                </div>
              );
            })}
          <MdOutlineChevronRight
            onClick={() => {
              if (mainData?.current_page != mainData?.total_pages) {
                getMainData(mainData?.current_page + 1);
              }
            }}
            className={`text-2xl ${
              mainData?.current_page == mainData?.total_pages
                ? "text-gray-300"
                : "text-gray-600"
            } cursor-pointer`}
          />{" "}
          <MdOutlineKeyboardDoubleArrowRight
            onClick={() => {
              if (mainData?.current_page != mainData?.total_pages) {
                getMainData(mainData?.total_pages);
              }
            }}
            className={`text-2xl ${
              mainData?.current_page == mainData?.total_pages
                ? "text-gray-300"
                : "text-gray-600"
            } cursor-pointer`}
          />
        </div>
      </div>
    </div>
  );
};

export default MainTable;
