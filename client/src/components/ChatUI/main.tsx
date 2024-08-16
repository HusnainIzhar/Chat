"use client";
import React, { useState, useEffect } from "react";
import Header from "./header";
import UsersBox from "./usersBox";
import ChatBox from "./chatBox";
import { useSocket } from "../../providers/socket";
import { useRouter } from "next/navigation";
import { TUser } from "../../types/types";

type Props = {};

const ChatUi = (props: Props) => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [self, setSelf] = useState<String | undefined>(undefined);
  const [filteredUsers, setFilteredUsers] = useState<TUser[]>([]);
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [hide, setHide] = useState(false);
  const socket = useSocket();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (socket) {
      const handleUsersUpdate = (data: TUser[]) => {
        const currentUser = data.find((e) => e.id === socket.id);
        setSelf(currentUser?.name);
        if (currentUser === undefined) {
          router.replace("/");
        }
        const otherUsers = data.filter((e) => e.id !== socket.id);
        setUsers(
          otherUsers.map((user) => ({
            name: user.name,
            id: user.id,
            messages: [],
          }))
        );
      };
      const handleReceiveMsg = (msg: string, senderId: string) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === senderId
              ? {
                  ...user,
                  messages: [
                    ...user.messages,
                    { content: msg, type: "received" },
                  ],
                }
              : user
          )
        );
      };

      socket.on("users", handleUsersUpdate);
      socket.on("update", handleUsersUpdate);
      socket.on("receiveMsg", handleReceiveMsg);
      socket.emit("triggerUpdate");

      return () => {
        socket.off("update", handleUsersUpdate);
        socket.off("users", handleUsersUpdate);
        socket.off("receiveMsg", handleReceiveMsg);
      };
    }
  }, [socket, router]);

  useEffect(() => {
    if (users.length > 0) {
      const newFilteredUsers = users.filter((e) =>
        e.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredUsers(newFilteredUsers);
    }
  }, [search, users]);

  useEffect(() => {
    setActiveIndex(0);
  }, [search]);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    setHide(true);
  };

  const handleSendMsg = (value: string, id: string) => {
    setUsers((prevUser) =>
      prevUser.map((e) =>
        e.id === id
          ? {
              ...e,
              messages: [...e.messages, { content: value, type: "sent" }],
            }
          : e
      )
    );
    socket?.emit("newMsg", { id, msg: value });
  };

  console.log("filters is", filteredUsers);
  console.log("users are ", users);

  return (
    <div className="h-screen md:h-3/4 sm:h-1/2 w-screen bg-white">
      <Header name={self} />
      <div className="flex w-full h-[calc(100vh-64px)] overflow-hidden">
        {users.length > 0 ? (
          <>
            {!isMobile && (
              <>
                <UsersBox
                  search={search}
                  setSearch={setSearch}
                  users={filteredUsers}
                  activeIndex={activeIndex}
                  handleClick={handleCardClick}
                />
                {filteredUsers[activeIndex] ? (
                  <ChatBox
                    handleClick={() => setHide(false)}
                    handleSubmit={handleSendMsg}
                    user={filteredUsers[activeIndex]}
                  />
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    No user selected
                  </div>
                )}
              </>
            )}

            {isMobile && !hide && (
              <UsersBox
                isMobile={isMobile}
                hide={hide}
                search={search}
                setSearch={setSearch}
                users={filteredUsers}
                activeIndex={activeIndex}
                handleClick={handleCardClick}
              />
            )}

            {isMobile && hide && filteredUsers[activeIndex] && (
              <ChatBox
                handleClick={() => setHide(false)}
                isMobile={isMobile}
                handleSubmit={handleSendMsg}
                user={filteredUsers[activeIndex]}
              />
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            No user online
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatUi;
