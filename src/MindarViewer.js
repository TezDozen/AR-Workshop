import "./mindar-image-target-averaging";
import "./click-interaction";
import "./sound-control";
import "./animation-mixer";
import AFRAME from "aframe";
import * as THREE from "three";
import { useEffect, useState } from "react";

AFRAME.registerComponent("model-adjustment", {
  init: function () {
    this.el.addEventListener("model-loaded", (e) => {
      // console.log(this.el.components["gltf-model"]);
      const obj = this.el.getObject3D("mesh");
      // Go over the submeshes and modify materials we want.
      // obj.traverse((node) => {
      //   // console.log(node.name);
      //   if (node.name.includes("particle")) {
      //     node.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      //   }
      //   if (node.name === "Plane011") {
      //     node.material = new THREE.MeshStandardMaterial({ color: 0x777777 });
      //   }
      //   if (node.material && node.material?.name?.includes("mat")) {
      //     // node.material = new THREE.MeshBasicMaterial({
      //     //   color: 0xffffff,
      //     //   map: node.material.map,
      //     // });
      //     node.material.depthWrite = true;
      //     node.material.transparent = false;
      //     node.material.alphaTest = 0.5;
      //     node.material.alphaWrite = false;
      //     node.material.flatShading = true;
      //     // console.log(node.material);
      //   }
      // });
    });
  },
});

const animals = [
  "mouse",
  "ox",
  "tiger",
  "rabbit",
  "dragon",
  "snake",
  "horse",
  "goat",
  "monkey",
  "rooster",
  "dog",
  "pig",
];

const MindARViewer = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <div className="container">
      {showWelcome ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            position: "fixed",
            zIndex: 100,
            backgroundColor: "#000000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => {
            const soundEffect = new Audio();
            soundEffect.autoplay = true;

            // onClick of first interaction on page before I need the sounds
            // (This is a tiny MP3 file that is silent and extremely short - retrieved from https://bigsoundbank.com and then modified)
            soundEffect.src =
              "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
            setShowWelcome(false);
          }}
        >
          <span style={{ color: "white" }}>
            Enable sound,
            <br /> and click to start
          </span>
        </div>
      ) : (
        <a-scene
          mindar-image={`imageTargetSrc: /mind-ar-test/targets.mind; maxTrack: 1;`}
          //   mindar-image="imageTargetSrc: /mind-ar-test/targets.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
          //   embedded
          color-space="sRGB"
          renderer="colorManagement: true, physicallyCorrectLights"
          vr-mode-ui="enabled: false"
          device-orientation-permission-ui="enabled: false"
        >
          <a-assets>
            <a-asset-item
              id="snow"
              src="/mind-ar-test/models/snow.glb"
            ></a-asset-item>
            {animals.map((v, i) => (
              <a-asset-item
                key={v}
                id={v}
                src={`/mind-ar-test/models/${v}.glb`}
              ></a-asset-item>
            ))}
            <a-asset-item
              id="sound_src"
              preload="auto"
              class="a-sound"
              src="/mind-ar-test/sound.m4a"
              response-type="arraybuffer"
            ></a-asset-item>
          </a-assets>
          <a-entity light="type: ambient; color: #BBB"></a-entity>
          <a-entity
            light="type: directional; color: #FFF; intensity: 1"
            position="0 1 1"
          ></a-entity>
          <a-camera
            position="0 0 0"
            look-controls="enabled: false"
            cursor="fuse: false; rayOrigin: mouse;"
            raycaster="far: 10000; objects: [data-clickable]"
          ></a-camera>
          <a-sound
            id="sound"
            src="#sound_src"
            loop="true"
            positional="false"
          ></a-sound>

          {animals.map((v, i) => (
            <a-entity
              key={v}
              mindar-image-target-averaging={`targetIndex: ${i}`}
            >
              <a-gltf-model
                id={v}
                rotation="0 0 0"
                position="0 0 0"
                scale="0.5 0.5 0.5"
                src={`#${v}`}
                sound-control
                click-interaction
                // IMPORTANT!!!
                // If add this component without value, React will give it true instead of the default value!
                animation-mixer="clips: Animation"
              ></a-gltf-model>
              <a-gltf-model
                id={v + "_snow"}
                rotation="0 0 0"
                position="0 0 0"
                scale="0.5 0.5 0.5"
                src="#snow"
                click-interaction
                animation-mixer="clips: Animation"
              ></a-gltf-model>
            </a-entity>
          ))}
        </a-scene>
      )}
    </div>
  );
};

export default MindARViewer;
