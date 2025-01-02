"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import axios from "axios";
import { BACKEND_URI } from "@/app/Utils/urls";
import { getCookie } from "cookies-next";
import { TiTick } from "react-icons/ti";
import EditDetails from "./EditDetails";
import { FaRegComment } from "react-icons/fa";

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
    height: "65vh",
  },
};

const AddNew = ({ showSubscribe, setShowSubscribe, data }) => {
  const [clickedBtn, setClickedBtn] = useState("Edit Details");
  const [inputValue, setInputValue] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Check if window object is defined, ensuring this runs on the client side only
    if (typeof window !== "undefined" && document.querySelector("#__next")) {
      Modal.setAppElement("#__next");
    }
  }, []);

  useEffect(() => {
    if (showSubscribe) {
      getComments(data?.file_id);
    }
  }, [data, showSubscribe]);

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
    <div className="z-50 small-scroller">
      <Modal
        isOpen={showSubscribe}
        onRequestClose={() => setShowSubscribe(false)}
        style={customStyles}
        ariaHideApp={true}
      >
        <div className="relative flex flex-col px-4 items-center bg-white border-[#D3D4D6] border rounded-lg">
          <div className="flex items-center justify-between w-full text-[#242731] py-2 rounded-t-lg">
            <h5 className="text-2xl font-medium">Invoice Details</h5>
            <AiOutlineClose
              onClick={() => setShowSubscribe(false)}
              className="cursor-pointer text-2xl"
            />
          </div>
          <div className="flex w-full pt-1 pb-3 border-b border-b-gray-[#D3D4D6]">
            <div className="min-w-[24%] max-w-[33%]">
              <p className="text-gray-500">Invoice Date</p>
              <p className="text-lg">
                {new Date(data?.invoice_date).toString().slice(4, 16)}
              </p>
            </div>
            <div className="min-w-[24%] max-w-[33%]">
              <p className="text-gray-500">Invoice #</p>
              <p className="text-lg">{data?.invoice_number}</p>
            </div>
            <div className="min-w-[24%] max-w-[33%]">
              <p className="text-gray-500">PO #</p>
              <p className="text-lg">{data?.items[0]?.po_number}</p>
            </div>
          </div>
          <div className="w-full flex items-center gap-x-3 py-3">
            {[
              {
                icon: <FiEdit2 />,
                title: "Edit Details",
              },
              {
                icon: <FaRegComment />,
                title: "Comments",
              },
            ]?.map((e, i) => {
              return (
                <div
                  key={i}
                  className={`${
                    clickedBtn === e?.title
                      ? "bg-[#242731] text-white border-[#242731]"
                      : "bg-white text-[#242731] border-gray-400"
                  } flex items-center gap-x-2 px-4 border py-1.5 font-medium cursor-pointer rounded-lg`}
                  onClick={() => {
                    setClickedBtn(e?.title);
                  }}
                >
                  {e?.icon}
                  {e?.title}
                </div>
              );
            })}
          </div>
          <div className="w-full text-xl flex flex-col items-center">
            {clickedBtn === "Comments" ? (
              <div className="w-full text-lg pb-4">
                {comments && (
                  <div className="w-full">
                    <div className="mt-1.5 max-h-[30vh] overflow-y-auto pr-2 small-scroller">
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
                {comments?.length == 0 && (
                  <div className="w-full flex text-gray-700 items-center justify-center">
                    There are no comments!!
                  </div>
                )}
                <div className="flex items-center justify-between gap-x-1 mt-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add a Comment"
                    className="border w-[80%] border-aquaGreen outline-none bg-transparent rounded-lg py-1 px-4"
                  />
                  <button
                    className="w-[20%] bg-aquaGreen text-white py-1 ml-2 rounded-lg"
                    onClick={saveComment}
                  >
                    Comment
                  </button>
                </div>
              </div>
            ) : (
              <div className="pb-4 w-full rounded-lg">
                <EditDetails data={data} setShowSubscribe={setShowSubscribe} />
              </div>
            )}
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
    <div className="w-full py-1.5 rounded-md mb-1 flex items-start justify-start">
      <div className="w-1/12 aspect-square text-xl font-semibold text-white flex items-center justify-center rounded-full bg-gray-400/70 mr-2.5">
        {e?.createdBy[0]}
      </div>
      <div className="w-11/12">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600/90 mb-0">
            <span className="text-black mr-1 font-medium">{e?.createdBy}</span>{" "}
            {new Date(e?.createdOn).toString()?.slice(4, 21)}
          </p>
          <div className="relative">
            {showBox && (
              <div className="absolute z-50 right-6 top-0 text-sm bg-white border w-[7vw] rounded-md">
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
              rows={2}
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
          <p className="mr-2 text-[17px] mb-0">
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
