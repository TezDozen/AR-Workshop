import React from "react";
import "mind-ar/dist/mindar-image.prod.js";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";
import "aframe-extras/dist/aframe-extras.loaders";
import "./App.css";
import MindARViewer from "./mindar-viewer";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route index element={<Home />} />
          <Route element={<MindARViewer />} path="ar/:target" />
          <Route element={<div>404</div>} path="*" />
        </Routes>
      </div>
    </div>
  );
}

export default App;
