import React from "react";
import "./App.css";
import Catalog from "./components/Catalog/Catalog";
const App: React.FC = () => (
  <div className="App">
    <header className="App-header">
      <Catalog />
    </header>
  </div>
);

export default App;
