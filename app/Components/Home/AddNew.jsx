"use client";
import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import { Toaster } from "react-hot-toast";

const customStyles = {
  overlay: { zIndex: 50 },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "35vw",
    border: "none",
  },
};

const AddNew = ({ showSubscribe, setShowSubscribe }) => {
  function closeModal() {
    setShowSubscribe(false);
  }

  return (
    <div className="z-50">
      <Toaster />
      <Modal
        isOpen={showSubscribe}
        onRequestCl2ose={closeModal}
        style={customStyles}
      >
        <div className="relative bg-white border-aquaGreen border rounded-lg">
          <AiOutlineClose
            size={40}
            onClick={closeModal}
            className="absolute top-3 text-white right-2 px-2 cursor-pointer"
          />
          <div className="bg-aquaGreen text-center text-2xl font-semibold text-white py-4 rounded-t-lg">
            Invoice Details
          </div>
          <div className="py-4 px-8 flex flex-col items-center">
            <p className="text-xl text-center">Invoice Date : 2nd Nov, 2024</p>{" "}
            <div className="w-full flex items-center text-lg py-4">
              <label
                htmlFor="invoice"
                className="block text-black w-3/12 text-end mr-4"
              >
                Invoice number :
              </label>
              <input
                id="invoice"
                type="text"
                className="py-1.5 px-4 outline-none border border-aquaGreen rounded-md w-9/12"
                placeholder="Enter your Invoice No."
              />
            </div>
            <div className="w-full flex items-center text-lg pb-4">
              <label
                htmlFor="po_number"
                className="block text-black w-3/12 text-end mr-4"
              >
                PO number :
              </label>
              <input
                id="po_number"
                type="text"
                className="py-1.5 px-4 outline-none border border-aquaGreen rounded-md w-9/12"
                placeholder="Enter your PO No."
              />
            </div>{" "}
            <div className="w-full text-lg pb-4">
              <label htmlFor="commend" className="block text-black">
                Add a Comment
              </label>
              <textarea
                id="commend"
                className="py-1.5 px-4 mt-1 outline-none border border-aquaGreen rounded-md w-full"
                placeholder="Enter Text..."
              ></textarea>
            </div>
            <button className="mx-auto bg-aquaGreen text-white px-8 text-xl py-2 rounded-lg font-semibold">
              Submit{" "}
            </button>
            <button className="text-black text-xl border-b border-b-black mt-2">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddNew;
