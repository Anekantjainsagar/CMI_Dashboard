"use context";
import { useState } from "react";
import AddNew from "./AddNew";

const DetailsBlock = ({ data }) => {
  const [editAgency, setEditAgency] = useState(false);

  return (
    <>
      <AddNew showSubscribe={editAgency} setShowSubscribe={setEditAgency} />
      <div
        onClick={() => {}}
        className="border-gray-200/5 border-y grid gridNumbers items-center cursor-pointer h-[8vh] text-[13px] border-b border-b-[#CACACA]"
      >
        {[
          "123456",
          "02/11/24",
          "PO 987654",
          "Maitry Industries PVT. LTD.",
          "Kolkata",
          "Florida",
          ["TS1-21312", "KSALSAT-1"],
          ["Single Straw 6 mm", "Double layered box"],
          [12000, 5000],
          [1.0, 2.5],
          [12000, 12500],
          17000,
          24500,
        ].map((e, i) => {
          return (
            <p
              key={i}
              className={`flex flex-col items-center justify-center min-[1600px]:text-base text-center border-[#CACACA] h-full ${
                i == 0 && "border-l"
              } ${i !== 13 && "border-r"}`}
            >
              {Array.isArray(e) ? (
                <>
                  <span className="w-full h-1/2 flex items-center justify-center">
                    {e[0]}
                  </span>
                  <span className="border-t w-full border-t-[#CACACA] h-1/2 flex items-center justify-center">
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
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.0415 8.75H10.6665V14.375H11.2915M18.7915 10C18.7915 12.1549 17.9355 14.2215 16.4117 15.7452C14.888 17.269 12.8214 18.125 10.6665 18.125C8.51162 18.125 6.44499 17.269 4.92126 15.7452C3.39753 14.2215 2.5415 12.1549 2.5415 10C2.5415 7.84512 3.39753 5.77849 4.92126 4.25476C6.44499 2.73102 8.51162 1.875 10.6665 1.875C12.8214 1.875 14.888 2.73102 16.4117 4.25476C17.9355 5.77849 18.7915 7.84512 18.7915 10Z"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.2915 5.9375C11.2915 6.10326 11.2257 6.26223 11.1084 6.37944C10.9912 6.49665 10.8323 6.5625 10.6665 6.5625C10.5007 6.5625 10.3418 6.49665 10.2246 6.37944C10.1074 6.26223 10.0415 6.10326 10.0415 5.9375C10.0415 5.77174 10.1074 5.61277 10.2246 5.49556C10.3418 5.37835 10.5007 5.3125 10.6665 5.3125C10.8323 5.3125 10.9912 5.37835 11.1084 5.49556C11.2257 5.61277 11.2915 5.77174 11.2915 5.9375Z"
              fill="black"
              stroke="black"
              stroke-width="0.5"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default DetailsBlock;
