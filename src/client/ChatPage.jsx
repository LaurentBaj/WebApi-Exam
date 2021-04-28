import React, { useEffect, useState } from "react";
import { ChatView } from "./ChatView";

export function ChatPage({ member }) {
  const [chatLog, setChatLog] = useState([]);
  const [ws, setWs] = useState();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    ws.onopen = (event) => {
      console.log("opened", event);
    };
    ws.onmessage = (event) => {
      console.log("from server", event);
      setChatLog((chatLog) => [...chatLog, event.data]);
    };
    ws.onclose = (event) => {
      console.log("close", event);
    };
    setWs(ws);
  }, []);

  return (
    <ChatView
      chatLog={chatLog}
      onSendMessage={(message) => ws.send(message)}
      member={member}
    />
  );
}
