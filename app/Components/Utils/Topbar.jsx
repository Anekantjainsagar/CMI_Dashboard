"use client";
import Context from "@/app/Context/Context";
import React, { useContext } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { BACKEND_URI } from "@/app/Utils/urls";
import { getCookie } from "cookies-next";

const Topbar = () => {
  const {
    search_text,
    setSearch_text,
    allData,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
  } = useContext(Context);

  const exportToExcel = async () => {
    try {
      const result = await axios.get(`${BACKEND_URI}/data/data/export`, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
        responseType: "blob",
      });

      const blob = new Blob([result.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }); // Adjust MIME type if necessary.
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Document digitization.xlsx"); // Set a default file name.
      document.body.appendChild(link);
      link.click();

      // Clean up the DOM.
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err);
    }
  };

  // const exportToExcel = () => {
  //   const worksheet = XLSX.utils.json_to_sheet(allData);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  //   const excelBuffer = XLSX.write(workbook, {
  //     bookType: "xlsx",
  //     type: "array",
  //   });
  //   const blob = new Blob([excelBuffer], {
  //     type: "application/octet-stream",
  //   });
  //   saveAs(blob, `Document digitization.xlsx`);
  // };

  return (
    <div className="flex items-center justify-between p-4">
      <div className="relative w-[30vw]">
        <input
          type="text"
          value={search_text}
          placeholder="Search Invoice # or PO #"
          onChange={(e) => setSearch_text(e.target.value)}
          className="w-full py-2 pl-12 pr-4 rounded-lg outline-none border border-[#CACACA] text-lg"
        />
        <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-xl" />
      </div>
      <div className="flex items-center gap-x-3">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 ring-2 ring-transparent focus:ring-blue-500 outline-none"
          calendarClassName="shadow-lg rounded-md border border-gray-200"
          popperClassName="z-50"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 ring-2 ring-transparent focus:ring-blue-500 outline-none"
          calendarClassName="shadow-lg rounded-md border border-gray-200"
          popperClassName="z-50"
        />
        {(startDate || endDate) && (
          <AiOutlineClose
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              setStartDate("");
              setEndDate("");
            }}
          />
        )}
        <button
          onClick={exportToExcel}
          className="bg-aquaGreen flex items-center gap-x-3 text-white font-semibold px-5 py-2 text-lg rounded-lg"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_271_4146)">
              <path
                d="M23.1203 7.06172L16.1696 0.110156C16.0993 0.0398437 16.0042 0 15.9048 0H8.03167C6.19933 0 4.7087 1.49109 4.7087 3.32344V9.90047H1.79214C1.2287 9.90047 0.770264 10.3589 0.770264 10.9223V16.7967C0.770264 17.3602 1.2287 17.8186 1.79214 17.8186H4.7087V20.6766C4.7087 22.5089 6.19933 24 8.03167 24H19.907C21.7393 24 23.23 22.5089 23.23 20.6766V7.32703C23.23 7.22766 23.1906 7.13203 23.1203 7.06172ZM4.31776 14.663V13.0575C4.31776 12.1842 5.02792 11.4736 5.90073 11.4736C6.77308 11.4736 7.48323 12.1842 7.48323 13.0575C7.48323 13.2647 7.31542 13.4325 7.10823 13.4325C6.90151 13.4325 6.7337 13.2647 6.7337 13.0575C6.7337 12.5977 6.36011 12.2231 5.90073 12.2231C5.44136 12.2231 5.0673 12.5977 5.0673 13.0575V14.663C5.0673 15.1223 5.44136 15.4959 5.90073 15.4959C6.36011 15.4959 6.7337 15.1223 6.7337 14.663C6.7337 14.4558 6.90151 14.288 7.10823 14.288C7.31542 14.288 7.48323 14.4558 7.48323 14.663C7.48323 15.5353 6.77308 16.2455 5.90073 16.2455C5.02792 16.2455 4.31776 15.5353 4.31776 14.663ZM22.4804 20.6766C22.4804 22.0959 21.3259 23.2505 19.907 23.2505H8.03167C6.61276 23.2505 5.45823 22.0959 5.45823 20.6766V17.8186H17.8046C18.3681 17.8186 18.8265 17.3602 18.8265 16.7967V10.9223C18.8265 10.3589 18.3681 9.90047 17.8046 9.90047H5.45823V3.32344C5.45823 1.90406 6.61276 0.749531 8.03167 0.749531H15.5298V6.57609C15.5298 7.19672 16.0342 7.70156 16.6539 7.70156H22.4804V20.6766ZM9.91745 14.235C9.60011 14.235 9.13558 14.212 8.76808 14.0128C8.47839 13.8558 8.13292 13.5277 8.13292 12.8545C8.13292 12.0938 8.75167 11.475 9.51198 11.475H10.1101C10.765 11.475 11.2979 12.0075 11.2979 12.6619C11.2979 12.8686 11.1301 13.0364 10.9234 13.0364C10.7162 13.0364 10.5484 12.8686 10.5484 12.6619C10.5484 12.4205 10.352 12.2245 10.1101 12.2245H9.51198C9.16464 12.2245 8.88198 12.5072 8.88198 12.8545C8.88198 13.1995 8.96027 13.4855 9.91745 13.4855C10.6787 13.4855 11.2979 14.1042 11.2979 14.865C11.2979 15.6258 10.6787 16.2455 9.91745 16.2455H9.31933C8.66495 16.2455 8.13292 15.7125 8.13292 15.0577C8.13292 14.8505 8.30073 14.6827 8.50745 14.6827C8.71464 14.6827 8.88198 14.8505 8.88198 15.0577C8.88198 15.2991 9.07839 15.4959 9.31933 15.4959H9.91745C10.2653 15.4959 10.5484 15.2128 10.5484 14.865C10.5484 14.5177 10.2653 14.235 9.91745 14.235ZM12.1168 11.4928C12.3132 11.4277 12.5251 11.5341 12.5903 11.7305L13.569 14.6808L14.5482 11.7305C14.6139 11.5341 14.8257 11.4277 15.0221 11.4928C15.2185 11.558 15.325 11.7703 15.2598 11.9667L13.9243 15.9886C13.8732 16.1419 13.7303 16.2455 13.5685 16.2455C13.4879 16.2455 13.412 16.2197 13.3492 16.1747C13.2873 16.1297 13.2385 16.065 13.2132 15.9886L11.8792 11.9667C11.814 11.7703 11.9204 11.558 12.1168 11.4928Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_271_4146">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Export as XLSX
        </button>
      </div>
    </div>
  );
};

export default Topbar;
