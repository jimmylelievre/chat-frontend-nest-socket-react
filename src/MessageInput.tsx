import { useState } from "react";

export default function MessageInput({
  send,
}: {
  send: (val: string) => void;
}) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    setValue(""); // Réinitialiser la valeur du champ texte à une chaîne vide
    send(value); // Envoyer la valeur mise à jour à la fonction send
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="mt-5">
      <input
        className="rounded border-2 p-2 mr-2"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ton message..."
        value={value}
      />
      <button onClick={() => handleSend()}>Send</button>
    </div>
  );
}
