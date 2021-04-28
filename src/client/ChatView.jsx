import * as React from "react";
import { useState } from "react";

export function ChatView({ onSendMessage, chatLog, member }) {
  const [message, setMessage] = useState("");

  function handleSubmitChatMessage(e) {
    e.preventDefault();
    onSendMessage(message);
    setMessage("");
  }

  return (
    <>
      <footer>
        <form onSubmit={handleSubmitChatMessage}>
          <input
            type="text"
            autoFocus={true}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button>Submit</button>
        </form>
      </footer>
      <main>
        <div className={"output"}>
          {chatLog.map((message, index) => (
            <div key={index}>
              {member.firstName} wrote: "{message}"
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
