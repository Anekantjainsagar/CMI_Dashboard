"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { BACKEND_URI } from "@/app/Utils/urls";
import { getCookie } from "cookies-next";
import { TiTick } from "react-icons/ti";

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
    backgroundColor: "transparent",
  },
};

const AddNew = ({ showSubscribe, setShowSubscribe, data }) => {
  const [inputValue, setInputValue] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Check if window object is defined, ensuring this runs on the client side only
    if (typeof window !== "undefined" && document.querySelector("#__next")) {
      Modal.setAppElement("#__next");
    }
  }, []);

  useEffect(() => {
    getComments(data?.file_id);
  }, [data]);

  const saveComment = () => {
    let cookie = getCookie("token");

    if (inputValue.trim()?.length > 0) {
      if (cookie?.length > 5) {
        try {
          axios
            .post(
              `${BACKEND_URI}/data/comments`,
              {
                file_id: data?.file_id,
                comment_text: inputValue,
                created_by: "Admin",
              },
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  Authorization: `Bearer ${cookie}`,
                },
              }
            )
            .then((res) => {
              toast.success("New Comment Added Successfully");
              setComments([
                { id: res.data.ID, file_id: res.data.FileID, ...res.data },
                ...comments,
              ]);
              setInputValue("");
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      toast.error("Please enter something to comment");
    }
  };

  const getComments = (id) => {
    let cookie = getCookie("token");

    if (cookie?.length > 5) {
      try {
        axios
          .get(`${BACKEND_URI}/data/comments/${id}`, {
            headers: {
              Authorization: `Bearer ${cookie}`,
            },
          })
          .then((res) => {
            setComments(res.data.reverse());
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="z-50">
      <Toaster />
      <Modal
        isOpen={showSubscribe}
        onRequestClose={() => setShowSubscribe(false)}
        style={customStyles}
        ariaHideApp={true}
      >
        <div className="relative bg-white border-aquaGreen border rounded-lg">
          <AiOutlineClose
            size={40}
            onClick={() => setShowSubscribe(false)}
            className="absolute top-3 text-white right-2 px-2 cursor-pointer"
          />
          <div className="bg-aquaGreen text-center text-2xl font-semibold text-white py-4 rounded-t-lg">
            Invoice Details
          </div>
          <div className="py-4 px-8 text-xl flex flex-col items-center">
            <div className="flex items-center mb-2 w-full">
              <p className="w-4/12 text-lg text-gray-500">Invoice Date</p>
              <p className="w-7/12">
                {new Date(data?.invoice_date).toString().slice(4, 16)}
              </p>
            </div>
            <div className="flex items-center mb-2 w-full">
              <p className="w-4/12 text-lg text-gray-500">Invoice Number</p>
              <p className="w-7/12">{data?.invoice_number}</p>
            </div>
            <div className="flex items-center mb-2 w-full">
              <p className="w-4/12 text-lg text-gray-500">PO Number</p>
              <p className="w-7/12">{data?.po_number}</p>
            </div>
            <div className="h-[1px] mx-auto w-full my-3 bg-aquaGreen"></div>
            <div className="w-full text-lg pb-4">
              {comments && (
                <div className="w-full">
                  <p className="text-gray-500">Comments</p>
                  <div className="mt-1.5 max-h-[35vh] overflow-y-auto pr-2 small-scroller">
                    {comments?.map((e, i) => {
                      return (
                        <CommentBlock
                          e={e}
                          key={i}
                          comments={comments}
                          setComments={setComments}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between gap-x-1 mt-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Add a Comment"
                  className="border w-9/12 border-aquaGreen outline-none bg-transparent rounded-lg py-1 px-4"
                />
                <button
                  className="w-3/12 bg-aquaGreen text-white py-1 ml-2 rounded-lg"
                  onClick={saveComment}
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const CommentBlock = ({ e, comments, setComments }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showBox, setShowBox] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [inputValue, setInputValue] = useState(e?.comment);

  useEffect(() => {
    setInputValue(e?.comment);
  }, [e]);

  return (
    <div className="w-full py-1.5 rounded-md mb-2 flex items-start justify-start">
      <div className="w-1/12 h-[4.5vh] text-white flex items-center justify-center rounded-full bg-gray-400 mr-2.5">
        {e?.createdBy[0]}
      </div>
      <div className="w-11/12">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            <span className="text-black mr-1">{e?.createdBy}</span>{" "}
            {new Date(e?.createdOn).toString()?.slice(4, 21)}
          </p>
          <div className="relative">
            {showBox && (
              <div className="absolute right-6 top-0 text-sm bg-white border w-[7vw] rounded-md">
                <p
                  className="text-center py-1.5 cursor-pointer hover:bg-gray-200 transition-all rounded-md"
                  onClick={() => {
                    setShowBox(false);
                    setIsEditable(true);
                  }}
                >
                  Edit Comment
                </p>
                <p
                  className="text-center py-1.5 cursor-pointer hover:bg-gray-200 transition-all rounded-md"
                  onClick={() => {
                    let cookie = getCookie("token");
                    axios
                      .delete(`${BACKEND_URI}/data/comments/${e?.id}`, {
                        headers: {
                          "Content-Type": "application/x-www-form-urlencoded",
                          Authorization: `Bearer ${cookie}`,
                        },
                      })
                      .then((res) => {
                        if (res.status == 200) {
                          setShowBox(false);
                          setComments(
                            comments?.filter((el) => el?.id !== e?.id)
                          );
                          toast.success(res.data.detail);
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  Delete Comment
                </p>
              </div>
            )}
            {showBox ? (
              <AiOutlineClose
                className="text-gray-600 cursor-pointer"
                onClick={() => {
                  setShowBox(!showBox);
                }}
              />
            ) : (
              <BsThreeDotsVertical
                className="text-gray-600 cursor-pointer"
                onClick={() => {
                  setShowBox(!showBox);
                }}
              />
            )}
          </div>
        </div>
        {isEditable ? (
          <div className="w-[97%] mt-1.5 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              rows={4}
              placeholder="Enter a Comment"
              className="outline-none w-full small-scroller rounded-lg border border-aquaGreen text-[17px] px-2.5 py-1"
            ></textarea>
            <TiTick
              onClick={() => {
                let cookie = getCookie("token");
                axios
                  .put(
                    `${BACKEND_URI}/data/comments/${e?.id}`,
                    {
                      new_comment_text: inputValue,
                    },
                    {
                      headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: `Bearer ${cookie}`,
                      },
                    }
                  )
                  .then((res) => {
                    toast.success("Comment Updated Successfully");
                    setComments((prevItems) =>
                      prevItems.map((item) =>
                        item?.id === e?.id
                          ? { ...item, comment: inputValue }
                          : item
                      )
                    );
                    setIsEditable(false);
                    setInputValue("");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
              className="bg-aquaGreen text-white text-3xl cursor-pointer rounded-full p-1.5 absolute -right-2 bottom-[2px]"
            />
          </div>
        ) : (
          <p className="mr-2 text-[17px]">
            {showFullDesc ? e?.comment : e?.comment?.slice(0, 90)}
            {e?.comment?.length > 90 && (
              <span
                className="text-aquaGreen cursor-pointer ml-1"
                onClick={() => {
                  setShowFullDesc(!showFullDesc);
                }}
              >
                {showFullDesc ? "Show less" : "Show more"}
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddNew;
