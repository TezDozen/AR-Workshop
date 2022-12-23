import { registerComponent, THREE } from "aframe";

registerComponent("click-interaction", {
  schema: {
    animal: { type: "string" },
  },

  isAnimationPlaying: false,

  isSoundPlaying: false,

  shouldPlayHohoho: false,

  init: function () {
    const el = this.el;
    const animal = this.data.animal;
    let component = this;
    let soundEl = document.querySelector(`#sound_animal`);
    let sound = soundEl.components.sound;

    let soundEndCallback = () => {
      console.log("sound ended");
      component.isSoundPlaying = false;
      soundEl.setAttribute(
        "src",
        `#sound_src_${component.shouldPlayHohoho ? "hohoho" : animal}`
      );
      component.shouldPlayHohoho = !component.shouldPlayHohoho;
    };

    el.parentNode.addEventListener("targetFound", (e) => {
      soundEl.setAttribute("src", `#sound_src_${animal}`);
      component.shouldPlayHohoho = true;
      el.setAttribute("data-clickable", "");
      soundEl.addEventListener("sound-ended", soundEndCallback);
      console.log("targetFound");
    });

    el.parentNode.addEventListener("targetLost", () => {
      el.removeAttribute("data-clickable");
      sound.stopSound();
      this.isSoundPlaying = false;
      soundEl.removeEventListener("sound-ended", soundEndCallback);
      console.log("targetLost");
    });

    if (animal === "goat" || animal === "rabbit") {
      document
        .querySelector(`#${animal}`)
        .addEventListener("model-loaded", (e) => {
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

      let animationFinishCallback = (e) => {
        console.log("animation ended");
        component.isAnimationPlaying = false;
        e.target.removeEventListener(
          "animation-finished",
          animationFinishCallback
        );
      };

      if (animal === "goat") {
        component.animations.sort(() => Math.random() - 0.5);
        component.isAnimationPlaying = true;

        const modelEl = document.querySelector("#goat");
        modelEl.setAttribute("animation-mixer__0", {
          clips: component.animations.slice(0, 3).map((v) => v.name),
          loop: "once",
        });

        modelEl.addEventListener("animation-finished", animationFinishCallback);
      }

      if (animal === "rabbit") {
        component.isAnimationPlaying = true;

        const modelEl = document.querySelector("#rabbit");
        modelEl.removeAttribute("animation-mixer__0");
        modelEl.setAttribute("animation-mixer__0", {
          clips: [...component.animations].map((v) => v.name),
          loop: "once",
        });

        modelEl.addEventListener("animation-finished", animationFinishCallback);
      }
    });
  },
});
