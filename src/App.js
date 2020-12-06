import React, { useEffect } from "react";
import logo from "./logo.svg";
import { http } from "./config/api/http";
import "./App.css";

function App() {
  useEffect(() => {
    getMessage();
  }, []);

  async function getMessage() {
    try {
      const { data } = await http.get("/landing");
      alert(data.message);
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
