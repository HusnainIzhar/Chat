"use client";
import React, { useState } from "react";
import { useSocket } from "../providers/socket";
import { useRouter } from "next/navigation";

type Props = {};

const Home = (props: Props) => {
  const [name, setName] = useState("");
  const router = useRouter();
  const socket = useSocket();

  const handleSubmit = () => {
    socket?.emit("newUser", name);
    setName("");
    router.push("/chat");
  };
  return (
    <div className="relative h-screen overflow-hidden w-screen bg-purple-100">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="top-36 flex flex-col absolute gap-5 items-center">
          <h1 className="text-4xl font-bold">Linkup</h1>
          <p className="text-[#7678ed]">Connecting people globally!</p>
        </div>

        <div className="flex gap-5">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="border rounded-md p-2 bg-[#f9fafc]  focus:bg-[#dbdcff] outline-none"
            placeholder="Enter you name"
          />
          <button
            onClick={handleSubmit}
            className="py-2 px-3 rounded-md bg-[#202022] text-white"
          >
            Get Started!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
