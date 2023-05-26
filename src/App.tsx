import React, { useEffect, useState } from "react";
import "./App.css";
import io, { Socket } from "socket.io-client";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

function App() {
  const [socket, setSocket] = useState<Socket | undefined>();
  const [messages, setMessages] = useState<any[]>([]);
  const [connectedUsers, setConnectedUsers] = useState<any[]>([]);
  const [username, setUsername] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [colorUser, setColorUser] = useState("");

  const send = (value: string) => {
    socket?.emit("message", value);
  };

  useEffect(() => {
    const newSocket = io("http://localhost:8001");
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        setIsConnected(true);
      });

      socket.on("disconnect", () => {
        setIsConnected(false);
      });

      socket.on("message", (data: any) => {
        setMessages((prevMessages) => [...prevMessages, data.message]);
      });

      socket.on("userConnected", (data: any) => {
        setColorUser(data.color);
        setConnectedUsers((prevUsers) => [...prevUsers, data]);
      });

      socket.on("userDisconnected", (data: any) => {
        setConnectedUsers((prevUsers) =>
          prevUsers.filter((u) => u.username !== data.username)
        );
      });

      return () => {
        socket.disconnect(); // Déconnexion lorsque le composant est démonté
      };
    }
  }, [socket]);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleConnect = () => {
    // Vérifier si un nom d'utilisateur est saisi
    if (username.trim() === "") {
      return;
    }

    // Envoyer le nom d'utilisateur au serveur
    socket?.emit("setUsername", username);
    socket?.connect();
  };

  const handleDisconnect = () => {
    socket?.disconnect(); // Déconnexion du serveur WebSocket
    setMessages([]); // Effacer les messages affichés
    setConnectedUsers([]); // Réinitialiser la liste des personnes connectées
    setIsConnected(false); // Mettre isConnected à false
    setUsername(""); // Effacer le nom d'utilisateur
  };

  return (
    <>
      <div>
        {isConnected ? (
          <div className="flex gap-6">
            <div>
              <div className="text-left">
                <div className="flex justify-between items-center mb-3 ">
                  <h1 className="text-[30px] font-bold">Chat</h1>
                  {/* Bouton de déconnexion */}
                  <button onClick={handleDisconnect}>
                    Se déconnecter
                  </button>{" "}
                </div>
                <div className="flex gap-3 mb-3 ">
                  <p>Bienvenue </p>
                  <p className="font-bold">{username}</p>
                </div>
                <Messages messages={messages} color={colorUser} />
                <MessageInput send={send} />
              </div>
            </div>
            <div className="mt-[90px]">
              <h2>Personnes connectées {connectedUsers.length} :</h2>
              <ul>
                {connectedUsers.map((user) => (
                  <li key={user.username} style={{ color: user.color }}>
                    {user.username}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <input
              className="rounded border-2 p-2 mr-2"
              placeholder="Ton nom..."
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
            <button onClick={handleConnect}>Se connecter</button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
