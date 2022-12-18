import { registerComponent, THREE } from "aframe";

registerComponent("click-interaction", {
  schema: {
    animal: { type: "string" },
  },

  isAnimationPlaying: false,

  isSoundPlaying: false,

  init: function () {
    const el = this.el;
    const animal = this.data.animal;
    let component = this;
    let soundEl = document.querySelector(`#sound_animal`);
    let sound = soundEl.components.sound;

    el.parentNode.addEventListener("targetFound", (e) => {
      soundEl.setAttribute("src", `#sound_src_${animal}`);
      el.setAttribute("data-clickable", "");
      console.log("targetFound");
    });

    el.parentNode.addEventListener("targetLost", () => {
      el.removeAttribute("data-clickable");
      sound.stopSound();
      this.isSoundPlaying = false;
      console.log("targetLost");
    });

    if (animal === "goat") {
      document.querySelector(`#goat`).addEventListener("model-loaded", (e) => {
        let model = e.target.components["gltf-model"].model;
        component.animations = [...model.animations];
        component.baseAnimation = component.animations.splice(0, 1);
      });
    }

    el.addEventListener("click", function (e) {
      // console.log("clicked");
      if (component.isAnimationPlaying || component.isSoundPlaying) {
        console.log("ignore, is playing");
        return;
      }

      sound.playSound();
      component.isSoundPlaying = true;

      soundEl.addEventListener("sound-ended", () => {
        console.log("sound ended");
        component.isSoundPlaying = false;
      });

      if (animal === "goat") {
        component.animations.sort(() => Math.random() - 0.5);
        console.log(component.animations.slice(0, 3).map((v) => v.name));
        component.isAnimationPlaying = true;

        const modelEl = document.querySelector("#goat");
        modelEl.setAttribute("animation-mixer__0", {
          clips: component.animations.slice(0, 3).map((v) => v.name),
          loop: "once",
        });

        modelEl.addEventListener("animation-finished", () => {
          component.isAnimationPlaying = false;
        });
      }
    });
  },
});