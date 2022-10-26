import { useEffect, useRef } from "react";

const MindARViewer = () => {
  const ref = useRef();

  useEffect(() => {
    const modelEl = ref.current;
    if (modelEl) {
      modelEl.addEventListener("model-loaded", (e) => {
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
    }
  }, [ref]);

  return (
    <a-scene
      mindar-image="imageTargetSrc: /mind-ar-test/targets.mind; maxTrack: 1"
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
      <a-entity mindar-image-target="targetIndex: 0">
        <a-gltf-model
          ref={ref}
          rotation="0 0 0 "
          position="0 0 0"
          scale="0.5 0.5 0.5"
          src="#model"
          /**
           * IMPORTANT!!!
           * If add this component without value, React will give it true instead of the default value!
           */
          animation-mixer="clip: *"
        ></a-gltf-model>
      </a-entity>
    </a-scene>
  );
};

export default MindARViewer;
