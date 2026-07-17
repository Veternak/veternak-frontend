import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { getStoredAuthToken } from "./apiClient";

const SOCKET_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1").replace("/api/v1", "");

export function useChatSocket(consultationId, onMessageReceived) {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!consultationId) return;

    const token = getStoredAuthToken();
    const socket = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
      socket.emit("join_room", { consultationId: Number(consultationId) });
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("receive_message", (message) => {
      if (onMessageReceived) {
        onMessageReceived(message);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [consultationId, onMessageReceived]);

  const sendMessage = (messageText) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit("send_message", {
        consultationId: Number(consultationId),
        message: messageText,
      });
    }
  };

  return { isConnected, sendMessage };
}
