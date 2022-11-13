import React, { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/ChatSection/Chat";
import Sidebar from "./components/SidebarSection/Sidebar";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/chats").then((res) => {
      console.log(res.data);
      setMessages(res.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("9ca08a600333f628f6b7", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);
  console.log(messages);
  return (
    <div className="App">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
