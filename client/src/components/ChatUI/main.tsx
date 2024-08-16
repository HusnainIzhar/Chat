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
  const socket = useSocket();
  const router = useRouter();

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
                          messages: [...user.messages, { content: msg, type: "received" }],
                      }
                    : user
            )
        );
    };
    

      socket.on("update", handleUsersUpdate);
      socket.on("receiveMsg", handleReceiveMsg);
      socket.emit("triggerUpdate");

      return () => {
        socket.off("update", handleUsersUpdate);
        socket.off("receiveMsg", handleReceiveMsg);
      };
    }
  }, [socket, router]);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
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

  console.log(users);

  return (
    <div className="h-screen w-screen bg-white">
      <Header name={self} />
      <div className="flex w-full h-[calc(100vh-64px)] overflow-hidden">
        {users.length > 0 ? (
          <>
            <UsersBox
              users={users}
              activeIndex={activeIndex}
              handleClick={handleCardClick}
            />
            <ChatBox handleSubmit={handleSendMsg} user={users[activeIndex]} />
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
