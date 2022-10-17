import React, { useState } from "react";
import "mind-ar/dist/mindar-image.prod.js";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";
import "./App.css";
import MindARViewer from "./mindar-viewer";
import "aframe-extras";

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
