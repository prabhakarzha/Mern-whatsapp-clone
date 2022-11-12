import "./App.css";
import Chat from "./components/ChatSection/Chat";
import Sidebar from "./components/SidebarSection/Sidebar";

function App() {
  return (
    <div className="App">
      <div className="app__body">
        {/* <h1>lets build whatsapp clone</h1> */}

        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
