import AFRAME from "aframe";
import { Vector3, Quaternion, Matrix4 } from "three";

AFRAME.registerComponent("mindar-image-target-thresholding", {
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
