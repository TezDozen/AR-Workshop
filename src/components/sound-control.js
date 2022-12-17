import { registerComponent } from "aframe";

registerComponent("sound-control", {
  init: function () {
    const el = this.el;
    let sound = document.querySelector("#sound").components.sound;
    el.parentNode.addEventListener("targetFound", (e) => {
      sound.playSound();
    });
    el.parentNode.addEventListener("targetLost", () => {
      sound.pauseSound();
    });
  },
});
