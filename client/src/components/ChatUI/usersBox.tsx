import React from "react";
import SearchBox from "./searchBox";
import UserCard from "./userCard";
import {TUser} from "../../types/types"

type Props = {
  users: TUser[];
  activeIndex:number;
  handleClick:(value:number)=>void;
};

const UsersBox:React.FC<Props> = ({users,activeIndex,handleClick}) => {
  
  return (
    <div className="border w-[35%] p-5">
      <SearchBox />
      <div className="overflow-auto h-full p-5">
        {users.map((user, index) => (
          <UserCard
            key={user.id}
            name={user.name}
            isActive={activeIndex === index}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default UsersBox;
