import { registerComponent, THREE } from "aframe";

registerComponent("click-interaction", {
  isAnimationPlaying: false,
  init: function () {
    const el = this.el;
    let component = this;

    el.parentNode.addEventListener("targetFound", (e) => {
      el.setAttribute("data-clickable", "");
      console.log("targetFound");
    });

    el.parentNode.addEventListener("targetLost", () => {
      el.removeAttribute("data-clickable");
      console.log("targetLost");
    });

    if (el.id === "goat") {
      this.el.addEventListener("model-loaded", (e) => {
        let model = el.components["gltf-model"].model;
        component.animations = [...model.animations];
        component.baseAnimation = component.animations.splice(0, 1);
      });

      el.addEventListener("click", function (e) {
        // console.log("clicked");
        if (component.isAnimationPlaying) {
          console.log("ignore, is playing");
          return;
        }
        component.animations.sort(() => Math.random() - 0.5);
        console.log(component.animations.slice(0, 3).map((v) => v.name));
        component.isAnimationPlaying = true;

        el.setAttribute("animation-mixer__0", {
          clips: component.animations.slice(0, 3).map((v) => v.name),
          loop: "once",
        });

        el.addEventListener("animation-finished", () => {
          component.isAnimationPlaying = false;
        });
      });
    }
  },
});
