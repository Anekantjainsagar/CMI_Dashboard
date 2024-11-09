"use context";
import { useState } from "react";
import AddNew from "./AddNew";

const DetailsBlock = ({ data }) => {
  const [editAgency, setEditAgency] = useState(false);

  return (
    <>
      <AddNew
        showSubscribe={editAgency}
        setShowSubscribe={setEditAgency}
        data={data}
      />
      <div
        onClick={() => {}}
        className="border-gray-200/5 mr-[7px] border-y grid gridNumbers items-center cursor-pointer text-[13px] border-b border-b-[#CACACA]"
      >
        {[
          data?.invoice_number,
          data?.invoice_date
            ? new Date(data?.invoice_date).toString()?.slice(4, 16)
            : "",
          data?.po_number,
          data?.seller_name,
          data?.port_of_discharge,
          data?.port_of_loading,
          data?.product_id,
          data?.product_name,
          data?.product_quantity,
          data?.unit_price_usd,
          parseFloat(data?.unit_price_usd * data?.product_quantity).toFixed(2),
          data?.total_quantity,
          data?.total_price,
        ].map((e, i) => {
          return (
            <p
              key={i}
              className={`flex flex-col py-2 ${
                !Array.isArray(e) && "px-2"
              } items-center justify-center min-[1600px]:text-base text-center border-[#CACACA] h-full ${
                i == 0 && "border-l"
              } ${i !== 13 && "border-r"}`}
            >
              {Array.isArray(e) ? (
                <>
                  <span className="w-full h-1/2 py-1 px-2 flex items-center justify-center">
                    {e[0]}
                  </span>
                  <span className="border-t w-full py-1 px-2 border-t-[#CACACA] h-1/2 flex items-center justify-center">
                    {e[1]}
                  </span>
                </>
              ) : (
                e
              )}
            </p>
          );
        })}
        <div className="flex flex-col items-center justify-center border-r border-r-[#CACACA] gap-y-4 h-full">
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setEditAgency(!editAgency)}
          >
            <path
              d="M4.83309 15.8333H5.74809L14.6631 6.91833L13.7481 6.00333L4.83309 14.9183V15.8333ZM3.99976 16.6667V14.5667L14.9831 3.57333C15.0692 3.49721 15.1636 3.43833 15.2664 3.39666C15.3692 3.35499 15.4767 3.33388 15.5889 3.33333C15.7011 3.33277 15.8095 3.35055 15.9139 3.38666C16.0195 3.42166 16.1167 3.48499 16.2056 3.57666L17.0948 4.47166C17.1864 4.55999 17.2492 4.65721 17.2831 4.76333C17.3164 4.86888 17.3331 4.97444 17.3331 5.07999C17.3331 5.19333 17.3142 5.30166 17.2764 5.40499C17.2381 5.50777 17.1775 5.60194 17.0948 5.68749L6.09892 16.6667H3.99976ZM14.1981 6.46833L13.7481 6.00333L14.6631 6.91833L14.1981 6.46833Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default DetailsBlock;
