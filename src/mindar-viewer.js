import { useEffect, useRef } from "react";
import AFRAME from "aframe";
import { Vector3, Quaternion, Matrix4 } from "three";

const MindARViewer = () => {
  const ref = useRef();
  const arRef = useRef();

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

  // useEffect(() => {
  //   const arEl = arRef.current;
  //   if (arEl && arEl.systems["mindar-image-system"].anchorEntities[0]) {
  //     arEl.systems[
  //       "mindar-image-system"
  //     ].anchorEntities[0].el.updateWorldMatrix = () => {};
  //     console.log(
  //       arEl.systems["mindar-image-system"].anchorEntities[0].el
  //         .updateWorldMatrix
  //     );
  //   }
  // }, [arRef, arRef?.current?.systems?.["mindar-image-system"]?.anchorEntities]);
  useEffect(() => {
    AFRAME.registerComponent("mindar-image-target2", {
      dependencies: ["mindar-image-system"],

      schema: {
        targetIndex: { type: "number" },
      },

      postMatrix: null, // rescale the anchor to make width of 1 unit = physical width of card

      init: function () {
        const arSystem = this.el.sceneEl.systems["mindar-image-system"];
        arSystem.registerAnchor(this, this.data.targetIndex);

        const root = this.el.object3D;
        root.visible = false;
        root.matrixAutoUpdate = false;
      },

      setupMarker([markerWidth, markerHeight]) {
        const position = new AFRAME.THREE.Vector3();
        const quaternion = new AFRAME.THREE.Quaternion();
        const scale = new AFRAME.THREE.Vector3();
        position.x = markerWidth / 2;
        position.y = markerWidth / 2 + (markerHeight - markerWidth) / 2;
        scale.x = markerWidth;
        scale.y = markerWidth;
        scale.z = markerWidth;
        this.postMatrix = new AFRAME.THREE.Matrix4();
        this.postMatrix.compose(position, quaternion, scale);
      },

      updateWorldMatrix(worldMatrix) {
        if (!this.el.object3D.visible && worldMatrix !== null) {
          this.el.emit("targetFound");
        } else if (this.el.object3D.visible && worldMatrix === null) {
          this.el.emit("targetLost");
        }

        this.el.object3D.visible = worldMatrix !== null;
        if (worldMatrix === null) {
          return;
        }
        var m = new AFRAME.THREE.Matrix4();
        m.elements = worldMatrix;
        m.multiply(this.postMatrix);

        let position0 = new Vector3();
        let quaternion0 = new Quaternion();
        let scale0 = new Vector3();
        this.el.object3D.matrix.decompose(position0, quaternion0, scale0);

        let position = new Vector3();
        let quaternion = new Quaternion();
        let scale = new Vector3();
        m.decompose(position, quaternion, scale);
        if (position0.distanceTo(position) < 100) {
          position = position0;
        }

        if (quaternion0.angleTo(quaternion) < (Math.PI / 180) * 5) {
          quaternion = quaternion0;
        }

        if (scale0.distanceTo(scale) < 10) {
          scale = scale0;
        }

        this.el.object3D.matrix = new Matrix4().compose(
          position,
          quaternion,
          scale
        );
      },
    });
  }, []);

  return (
    <a-scene
      ref={arRef}
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
      <a-entity mindar-image-target2="targetIndex: 0">
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
