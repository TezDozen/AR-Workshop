const MindARViewer = () => {
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
        <a-asset-item id="model" src="/mind-ar-test/model2.glb"></a-asset-item>
      </a-assets>

      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
      <a-entity mindar-image-target="targetIndex: 0">
        <a-gltf-model
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
