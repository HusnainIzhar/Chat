import React from "react";
import Image from "next/image";

type Props = {
  name:String | undefined
};

const Header:React.FC<Props> = ({name}) => {
  return (
    <div className="w-full h-16 border flex justify-between px-24 items-center">
      <Image src={"./logo.svg"} height={150} width={150} alt="logo" />
      <Image
        src={`https://robohash.org/${name}.png`}
        height={40}
        width={40}
        alt="avatar"
        className="rounded-full bg-[#18D39E] border"
      />
    </div>
  );
};

export default Header;
