import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./mindar-image-target-averaging";
import "./mindar-image-target-thresholding";
import AFRAME from "aframe";

AFRAME.registerComponent("model-adjustment", {
  init: function () {
    this.el.addEventListener("model-loaded", (e) => {
      const obj = e.target.getObject3D("mesh");
      // Go over the submeshes and modify materials we want.
      obj.traverse((node) => {
        if (node.material && node.material?.name?.includes("mat")) {
          node.material.depthWrite = true;
          node.material.transparent = false;
          node.material.alphaTest = 0.5;
          node.material.alphaWrite = false;
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
          <a-asset-item id="model" src="/mind-ar-test/model.glb"></a-asset-item>
        </a-assets>
        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
        {[...Array(12).keys()].map((v) => (
          <a-entity key={v} mindar-image-target-averaging={`targetIndex: ${v}`}>
            <a-entity
              particle-system="preset: snow"
              position="0 0 0"
            ></a-entity>
            <a-gltf-model
              rotation="0 0 0 "
              position="0 0 0"
              scale="0.5 0.5 0.5"
              src="#model"
              model-adjustment
              /**
               * IMPORTANT!!!
               * If add this component without value, React will give it true instead of the default value!
               */
              animation-mixer="clip: *"
            ></a-gltf-model>
          </a-entity>
        ))}
      </a-scene>
    </div>
  );
};

export default MindARViewer;
