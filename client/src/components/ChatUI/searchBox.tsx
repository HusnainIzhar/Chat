import React from "react";
import { IoSearch } from "react-icons/io5";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

const SearchBox: React.FC<Props> = ({ search, setSearch }) => {
  return (
    <div className="w-full flex items-center gap-1 ">
      <IoSearch size={24} color="#ffa429" />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        className=" h-10 w-full outline-none px-5"
        placeholder="Search"
      />
    </div>
  );
};

export default SearchBox;
