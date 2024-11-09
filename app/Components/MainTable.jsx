"use client";
import { useContext, useEffect } from "react";
import DetailsBlock from "./Home/DetailsBlock";
import Context from "../Context/Context";

const MainTable = () => {
  const { getMainData, mainData } = useContext(Context);

  const showNextPage = () => {
    getMainData("inc");
  };

  const showPrevPage = () => {
    getMainData("dec");
  };

  return (
    <div className="px-4 border border-gray-200/5 rounded-2xl">
      <div className="grid bg-aquaGreen mr-3.5 text-white gridNumbers items-center rounded-t-2xl">
        {[
          "Invoice",
          "Date",
          "PO Number",
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
          "Actions",
        ].map((e, i) => {
          return (
            <h5
              key={i}
              className={`text-[13px] min-[1600px]:text-base px-2 h-[6vh] flex items-center justify-center text-center border-r-white ${
                i !== 13 && "border-r"
              }`}
            >
              {e}
            </h5>
          );
        })}
      </div>
      <div className="h-[74vh]">
        <div className="overflow-y-auto small-scroller h-[90%]">
          {mainData?.data?.map((e, i) => {
            return <DetailsBlock key={i} data={e} />;
          })}
        </div>
        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center justify-between w-full">
            <button
              onClick={showPrevPage}
              disabled={mainData?.current_page == 1}
              className={`text-white ${
                mainData?.current_page == 1 ? "bg-gray-400" : "bg-aquaGreen"
              } bg-[#898989]/15 flex items-center w-[120px] min-[1600px]:w-[150px] justify-center py-2.5 min-[1600px]:py-3 rounded-lg text-[14px] min-[1600px]:text-[18px]`}
            >
              <div className="mr-2 w-5 min-[1600px]:w-8">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ rotate: "180deg" }}
                >
                  <path
                    d="M21 12L16 7M21 12L16 17M21 12H3"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              Previous
            </button>
            <div className="gap-x-4 flex items-center">
              {[...Array(mainData?.total_pages).keys()]
                .map((i) => i + 1)
                ?.slice(0, 3)
                ?.map((e, i) => {
                  return (
                    <div
                      className={`w-[30px] min-[1600px]:w-[40px] h-[30px] text-sm min-[1600px]:text-base min-[1600px]:h-[40px] rounded-lg flex items-center justify-center cursor-pointer ${
                        mainData?.current_page == e
                          ? "bg-aquaGreen text-white"
                          : "text-[#85888E]"
                      }`}
                      key={i}
                    >
                      {e}
                    </div>
                  );
                })}
              {mainData?.total_pages - 6 > 0 && (
                <span className="text-[#85888E]">...</span>
              )}
              {mainData?.total_pages > 5 &&
                [...Array(mainData?.total_pages).keys()]
                  .map((i) => i + 1)
                  ?.slice(mainData?.total_pages - 3)
                  ?.map((e, i) => {
                    return (
                      <div
                        className={`w-[30px] min-[1600px]:w-[40px] h-[30px] text-sm min-[1600px]:text-base min-[1600px]:h-[40px] rounded-lg flex items-center justify-center cursor-pointer ${
                          mainData?.current_page == e
                            ? "bg-aquaGreen text-white"
                            : "text-[#85888E]"
                        }`}
                        key={i}
                      >
                        {e}
                      </div>
                    );
                  })}
            </div>
            <button
              onClick={showNextPage}
              disabled={mainData?.total_pages == mainData?.current_page}
              className={`text-white ${
                mainData?.total_pages == mainData?.current_page
                  ? "bg-gray-400"
                  : "bg-aquaGreen"
              } flex items-center w-[120px] min-[1600px]:w-[150px] justify-center py-2.5 min-[1600px]:py-3 rounded-lg text-[14px] min-[1600px]:text-[18px]`}
            >
              Next
              <div className="ml-2 w-5 min-[1600px]:w-8">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 12L16 7M21 12L16 17M21 12H3"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTable;
