import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

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
