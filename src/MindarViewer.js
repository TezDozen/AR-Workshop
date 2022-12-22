import "./components/mindar-image-target-averaging";
import "./components/click-interaction";
import "./components/sound-control";
import "./components/animation-mixer";
import AFRAME from "aframe";
import { useState } from "react";
import WelcomePanel from "./components/WelcomePanel";

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
        <WelcomePanel
          onClick={() => {
            setShowWelcome(false);
          }}
        />
      ) : (
        <a-scene
          mindar-image={`imageTargetSrc: /AR-Workshop/targets.mind; maxTrack: 1;`}
          //   mindar-image="imageTargetSrc: /AR-Workshop/targets.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
          //   embedded
          color-space="sRGB"
          renderer="colorManagement: true, physicallyCorrectLights"
          vr-mode-ui="enabled: false"
          device-orientation-permission-ui="enabled: false"
        >
          <a-assets>
            <a-asset-item
              id="snow"
              src="/AR-Workshop/models/snow.glb"
            ></a-asset-item>
            {animals.map((v, i) => (
              <a-asset-item
                key={v}
                id={"model_" + v}
                src={`/AR-Workshop/models/${v}.glb`}
              ></a-asset-item>
            ))}
            <a-asset-item
              id="sound_src"
              preload="auto"
              class="a-sound"
              src="/AR-Workshop/sound.m4a"
              response-type="arraybuffer"
            ></a-asset-item>
            {animals.map((v, i) => (
              <a-asset-item
                id={"sound_src_" + v}
                preload="auto"
                class="a-sound"
                key={v}
                src={`/AR-Workshop/sounds/${v}.mp3`}
                response-type="arraybuffer"
              ></a-asset-item>
            ))}
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
            raycaster="far: 100000; objects: [data-clickable]"
          ></a-camera>
          <a-sound
            id="sound"
            src="#sound_src"
            loop="true"
            positional="false"
          ></a-sound>
          <a-sound
            id="sound_animal"
            src=""
            loop="false"
            positional="false"
          ></a-sound>
          {/* {animals.map((v, i) => (
            <a-sound
              id={"sound_" + v}
              src={"#sound_src_" + v}
              key={v}
              loop="false"
              positional="false"
            ></a-sound>
          ))} */}

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
                src={`#model_${v}`}
                sound-control
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
                animation-mixer="clips: Animation"
                click-interaction={`animal: ${v}`}
              ></a-gltf-model>
            </a-entity>
          ))}
        </a-scene>
      )}
    </div>
  );
};

export default MindARViewer;
