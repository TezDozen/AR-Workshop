import React from "react";
import "mind-ar/dist/mindar-image.prod.js";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";
// import "aframe-extras/dist/aframe-extras.loaders";
import "./App.css";
import MindARViewer from "./MindarViewer";

function App() {
  return (
    <div className="App">
      <div className="container">
        <MindARViewer />
      </div>
    </div>
  );
}

export default App;
