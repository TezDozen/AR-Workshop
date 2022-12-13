import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./mindar-image-target-averaging";
import "./mindar-image-target-thresholding";
import AFRAME from "aframe";
import * as THREE from "three";

AFRAME.registerComponent("model-adjustment", {
  init: function () {
    this.el.addEventListener("model-loaded", () => {
      const obj = this.el.getObject3D("mesh");
      // Go over the submeshes and modify materials we want.
      obj.traverse((node) => {
        // console.log(node.name);
        if (node.name.includes("particle")) {
          node.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        }
        if (node.name === "Plane011") {
          node.material = new THREE.MeshStandardMaterial({ color: 0x777777 });
        }
        if (node.material && node.material?.name?.includes("mat")) {
          // node.material = new THREE.MeshBasicMaterial({
          //   color: 0xffffff,
          //   map: node.material.map,
          // });
          node.material.depthWrite = true;
          node.material.transparent = false;
          node.material.alphaTest = 0.5;
          node.material.alphaWrite = false;
          node.material.flatShading = true;
          console.log(node.material);
        }
      });
    });
  },
});

const MindARViewer = () => {
  const arRef = useRef();
  return (
    <div className="container">
      <a-scene
        ref={arRef}
        mindar-image={`imageTargetSrc: /mind-ar-test/targets.mind; maxTrack: 1`}
        //   mindar-image="imageTargetSrc: /mind-ar-test/targets.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
        //   embedded
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        <a-assets>
          <a-asset-item
            id="model"
            src="/mind-ar-test/models/test.glb"
          ></a-asset-item>
        </a-assets>
        <a-entity light="type: ambient; color: #BBB"></a-entity>
        <a-entity
          light="type: directional; color: #FFF; intensity: 2"
          position="0 1 1"
        ></a-entity>
        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
        {[...Array(12).keys()].map((v) => (
          <a-entity key={v} mindar-image-target-averaging={`targetIndex: ${v}`}>
            <a-gltf-model
              rotation="0 0 0 "
              position="0 0 0"
              scale="0.5 0.5 0.5"
              src="#model"
              model-adjustment
              // IMPORTANT!!!
              // If add this component without value, React will give it true instead of the default value!
              animation-mixer="clip: *"
            >
              {/* <a-entity light="type: directional; color: #FFF; intensity: 0.6"></a-entity> */}
            </a-gltf-model>
          </a-entity>
        ))}
      </a-scene>
    </div>
  );
};

export default MindARViewer;
