'use client'
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";

const SocketContext = createContext<typeof Socket | null>(null);

type Props = {
  children: ReactNode;
};

export const SocketProvider: FC<Props> = ({ children }) => {
  const [socket, setSocket] = useState<typeof Socket | null>(null);

  useEffect(() => {
    const newSocket = io(
      "https://chat-people-2a28f4eef0fb.herokuapp.com/"
    );

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};