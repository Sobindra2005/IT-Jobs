import "../css/styles.css";
import React, { useState, useEffect } from "react";

import axios from "axios";
import { getorcreateMsg } from "../api/messageHanlde";

function Message(props) {
  const [senderId, setsenderId] = useState(props.authenticatedUserDetails._id);

  async function showmsgBox(data, senderId, receiverId) {
    const createMsgResponce = await getorcreateMsg(senderId, receiverId);
    const allmsg = createMsgResponce.data.allMessage;
    const chatId = createMsgResponce.data.chatId;
    props.showMessageBox(data, chatId, allmsg);
  }

  const token = localStorage.getItem("token");
  return (
    <>
      <div className="Message z-9 bg-white fixed right-0 mt-16 border rounded-3xl  cursor-pointer h-screen  w-1/4 overflow-y-scroll">
        <h1 className=" p-3 pl-6 text-white fixed font-bold w-screen bg-notification rounded-tl-3xl text-2xl">
          Chats
        </h1>
        <div className=" bg-white mt-16 ">
          <input
            type="text"
            placeholder="search messages"
            className="outline-none border border-t-purple-200 text-base text-slate-700 w-11/12 ml-3 h-10 rounded-xl p-5 shadow-xl "
          >
           
          </input>
          <ul className="pt-4 ">
            {props.MessageList.length > 0 ? (
              <>
                {props.MessageList.map((data) => (
                  <li
                    onClick={() => showmsgBox(data, senderId, data._id)}
                    key={data._id}
                    className="flex shadow-md hover:bg-gray-200 transition duration-300 pb-2 pl-2  py-2 "
                  >
                    <div className="flex min-w-0 gap-x-2">
                      <img
                        className="h-14 object-center object-cover w-14 flex-none border border-gray-200 rounded-full bg-gray-50"
                        src="https://cdn.vectorstock.com/i/500p/16/05/male-avatar-profile-picture-silhouette-light-vector-5351605.jpg"
                        alt=""
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-base font text-black pt-1 font-medium">
                          {data.firstName} {data.lastName}
                        </p>
                        <p className="mt-0 truncate text-sm  text-gray-500">
                          {/* latest message */}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </>
            ) : (
              <div className="normal-case text-gray-500 w-[80%] m-auto mt-[50%]">
                No messages here. Why not send a hello to someone?
              </div>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Message;
