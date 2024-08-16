"use client";
import React, { useState } from "react";
import { useSocket } from "../providers/socket";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Props = {};

const Home = (props: Props) => {
  const [name, setName] = useState("");
  const router = useRouter();
  const socket = useSocket();

  const handleSubmit = () => {
    socket?.emit("newUser", name);
    router.push("/chat");
  };
  return (
    <div className="relative h-screen overflow-hidden w-screen bg-white">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="top-36 flex flex-col absolute gap-5 items-center">
          <Image src={"./logo.svg"} height={250} width={250} alt="logo" />
          <p className="text-[#FFA429] xs:mt-5 mt-10">Connecting people globally!</p>
        </div>

        <div className="flex gap-5 flex-wrap justify-center">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="border rounded-md p-2 bg-[#f9fafc]  focus:bg-[#dbdcff] outline-none"
            placeholder="Enter you name"
          />
          <button
            onClick={handleSubmit}
            className="py-2 px-3 rounded-md bg-[#FFA429] text-white hover:cursor-pointer"
          >
            Get Started!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
