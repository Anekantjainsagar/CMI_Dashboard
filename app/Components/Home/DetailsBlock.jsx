"use context";
import { useState } from "react";
import AddNew from "./AddNew";

const DetailsBlock = ({ data }) => {
  const [editAgency, setEditAgency] = useState(false);

  function isNumeric(str) {
    if (typeof str != "string") return false; // we only process strings!
    return (
      !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
  }

  return (
    <>
      <AddNew
        showSubscribe={editAgency}
        setShowSubscribe={setEditAgency}
        data={data}
      />
      <div
        onClick={() => setEditAgency(!editAgency)}
        className="border-gray-200/5 hover:border-gray-500/50 transition-all hover:bg-gray-100 mr-[7px] border-y grid gridNumbers items-center cursor-pointer text-[12px] border-b border-b-[#CACACA]"
      >
        {[
          data?.invoice_number || "-",
          data?.invoice_date
            ? new Date(data?.invoice_date).toString()?.slice(4, 16)
            : "-",
          data?.items[0]?.po_number || "-",
          data?.seller_name || "-",
          data?.port_of_discharge || "-",
          data?.port_of_loading || "-",
          data?.items[0]?.data?.map((e) => e?.product_id) || "-",
          data?.items[0]?.data?.map((e) => e?.product_name) || "-",
          data?.items[0]?.data?.map((e) => e?.product_quantity) || "-",
          data?.items[0]?.data?.map((e) => e?.unit_price_usd) || "-",
          data?.items[0]?.data?.map(
            (e) =>
              parseFloat(e?.unit_price_usd * data?.product_quantity).toFixed(
                2
              ) || "-"
          ),
          data?.total_quantity || "-",
          data?.total_price || "-",
        ].map((e, i) => {
          return (
            <div
              key={i}
              className={`flex flex-col py-2 ${
                !Array.isArray(e) && "px-2"
              } items-center justify-center min-[1600px]:text-[15px] text-[12px] border-[#CACACA] h-full ${
                i == 0 && "border-l"
              } ${i !== 13 && "border-r"} relative overflow-hidden`}
            >
              {i == 0 && data?.comments_count > 0 && (
                <div className="flex justify-center items-center absolute -right-2 -top-1">
                  <div className="w-0 h-0 border-l-[13px] border-l-transparent border-r-[13px] border-r-transparent border-b-[13px] rotate-45 border-b-red-700"></div>
                </div>
              )}
              {!Array.isArray(e) ? (
                <p
                  className={`w-full ${
                    i > 7 || i <= 2 ? "justify-center" : "justify-start"
                  } py-1 px-1 flex items-center min-h-[10vh] max-h-none`}
                >
                  {e}
                </p>
              ) : (
                <div className={`w-full`}>
                  {e?.length > 0 &&
                    e?.map((item, index, arr) => (
                      <p
                        key={index}
                        className={`w-full min-h-[6vh] max-h-[9vh] px-2 flex items-center ${
                          i > 7 || i <= 2 ? "justify-center" : "justify-start"
                        } ${index != 0 && "border-t"} border-t-[#CACACA]`}
                      >
                        {item === NaN ? "-" : item}
                      </p>
                    ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DetailsBlock;
