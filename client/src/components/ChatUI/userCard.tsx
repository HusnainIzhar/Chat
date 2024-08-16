import React from "react";
import Image from "next/image";

type Props = {
  name: string;
  isActive: boolean;
  onClick: () => void;
};

const UserCard: React.FC<Props> = ({ name, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`w-full flex items-center p-5 gap-5 rounded-md hover:cursor-pointer ${
        isActive ? "bg-[#ffa429] shadow-lg text-white" : "bg-white"
      }`}
    >
      <Image
        src={`https://robohash.org/${name}.png`}
        height={60}
        width={60}
        alt="user"
        className="rounded-full bg-[#18D39E] border"
      />
      <div>
        <h2 className="text-xl font-semibold capitalize">{name}</h2>
        <p className="text-xs">Online</p>
      </div>
    </div>
  );
};

export default UserCard;
