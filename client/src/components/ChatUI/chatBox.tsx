import { TUser } from "@/types/types";
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import Image from "next/image";

type Props = {
  user: TUser;
  handleSubmit: (value: string, id: string) => void;
};

const ChatBox: React.FC<Props> = ({ user, handleSubmit }) => {
  const [value, setValue] = useState("");
  console.log(user);
  return (
    <div className="flex h-full flex-1 ">
      <div className="flex-1 flex flex-col ">
        <div className="flex-1 border items-center justify-center p-5 overflow-auto h-full">
          {user.messages.length > 0 ? (
            user.messages.map((e, i) => (
              <div
                className={`${
                  e.type === "sent" ? "justify-end" : "justify-start"
                } flex mt-5`}
              >
                <div
                  className={`${
                    e.type === "sent" ? "bg-[#18d39e] text-white rounded-md" : "bg-[#F7F7F7]"
                  } py-2 px-3 max-w-64 break-words overflow-hidden text-wrap whitespace-pre-wrap`}
                  key={i}
                >
                  {e.content}
                </div>
              </div>
            ))
          ) : (
            <div className="flex-1 flex items-center justify-center">No messages</div>
          )}
        </div>
        <div className="border h-16 w-full flex justify-between px-16 items-center">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            className="w-full h-10 outline-none"
            placeholder="Send message"
          />
          <IoSend
            size={24}
            color="#ffa429"
            onClick={() => {
              handleSubmit(value, user.id);setValue('')
            }}
            className="hover:cursor-pointer hover:drop-shadow-lg hover:scale-150 transform transition-transform duration-300"

          />
        </div>
      </div>
      <div className="w-[30%] flex flex-col gap-5 items-center py-10 justify-center">
        <Image
          src={`https://robohash.org/${user.name}.png`}
          height={200}
          width={200}
          alt="user"
          className="bg-[#18D39E] rounded-full shadow-lg"
        />
        <h2 className="capitalize text-2xl font-semibold">{user.name}</h2>
        <p className="text-xs text-green-500">Online</p>
      </div>
    </div>
  );
};

export default ChatBox;
