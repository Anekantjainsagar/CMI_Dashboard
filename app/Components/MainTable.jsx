"use client";
import { useContext } from "react";
import DetailsBlock from "./Home/DetailsBlock";
import Context from "../Context/Context";

const MainTable = () => {
  const { getMainData, mainData } = useContext(Context);

  const showNextPage = () => {
    getMainData(mainData?.current_page + 1);
  };

  const showPrevPage = () => {
    getMainData(mainData?.current_page - 1);
  };

  return (
    <div className="px-4 border border-gray-200/5 rounded-2xl">
      <div className="grid bg-aquaGreen mr-3.5 text-white gridNumbers items-center rounded-t-2xl">
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
        <div className="flex gap-x-4 items-center justify-center mt-5">
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
                  onClick={() => {
                    getMainData(e);
                  }}
                >
                  {e}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MainTable;
