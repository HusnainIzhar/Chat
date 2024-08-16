import React, { useState } from "react";
import SearchBox from "./searchBox";
import UserCard from "./userCard";
import { TUser } from "../../types/types";

type Props = {
  users: TUser[];
  activeIndex: number;
  handleClick: (value: number) => void;
  search: string;
  setSearch: (value: string) => void;
  isMobile?: boolean;
  hide?:boolean
};

const UsersBox: React.FC<Props> = ({
  users,
  isMobile,
  hide,
  activeIndex,
  handleClick,
  search,
  setSearch,
}) => {
  return (
    <div className={`border ${isMobile && !hide ? "w-full" : "w-[35%]"}   p-5`}>
      <SearchBox search={search} setSearch={setSearch} />
      <div className="overflow-auto h-full p-5">
        {users.map((user, index) => (
          <UserCard
            key={user.id}
            name={user.name}
            isActive={activeIndex === index}
            onClick={() => {
              handleClick(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default UsersBox;
