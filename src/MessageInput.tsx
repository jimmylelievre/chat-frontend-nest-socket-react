import { useState } from "react";

export default function MessageInput({
  send,
}: {
  send: (val: string) => void;
}) {
  const [value, setvalue] = useState("");
  return (
    <div className="mt-5">
      <input
        className="rounded border-2 p-2 mr-2"
        onChange={(e) => setvalue(e.target.value)}
        placeholder="Type your message..."
        value={value}
      />
      <button onClick={() => send(value)}>Send</button>
    </div>
  );
}
