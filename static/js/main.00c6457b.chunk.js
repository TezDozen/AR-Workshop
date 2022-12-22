(this["webpackJsonpAR-Workshop"]=this["webpackJsonpAR-Workshop"]||[]).push([[0],{51:function(t,e,i){},72:function(t,e,i){},74:function(t,e,i){"use strict";i.r(e);var n=i(4),o=i(45),s=i.n(o),a=(i(51),i(52),i(11)),V=i.n(a),c=(i(71),i(72),i(8)),r=i(15);V.a.registerComponent("mindar-image-target-averaging",{dependencies:["mindar-image-system"],schema:{targetIndex:{type:"number"}},postMatrix:null,pastPositions:[],pastScales:[],init:function(){this.el.sceneEl.systems["mindar-image-system"].registerAnchor(this,this.data.targetIndex);var t=this.el.object3D;t.visible=!1,t.matrixAutoUpdate=!1},setupMarker:function(t){var e=Object(c.a)(t,2),i=e[0],n=e[1],o=new V.a.THREE.Vector3,s=new V.a.THREE.Quaternion,a=new V.a.THREE.Vector3;o.x=i/2,o.y=i/2+(n-i)/2,a.x=i,a.y=i,a.z=i,this.postMatrix=new V.a.THREE.Matrix4,this.postMatrix.compose(o,s,a)},updateWorldMatrix:function(t){if(this.el.object3D.visible||null===t?this.el.object3D.visible&&null===t&&this.el.emit("targetLost"):this.el.emit("targetFound"),this.el.object3D.visible=null!==t,null!==t){var e=new V.a.THREE.Matrix4;e.elements=t,e.multiply(this.postMatrix);var i=new r.c,n=new r.b,o=new r.c;this.el.object3D.matrix.decompose(i,n,o);var s=new r.c,a=new r.b,c=new r.c;e.decompose(s,a,c),this.pastPositions.push(s),this.pastPositions.length>10&&(this.pastPositions=this.pastPositions.slice(this.pastPositions.length-10,this.pastPositions.length)),s=new r.c(0,0,0),this.pastPositions.forEach((function(t){s.add(t)})),s.divideScalar(this.pastPositions.length),a=n.angleTo(a)<Math.PI/180*5?n:n.slerp(a,.2),this.pastScales.push(c),this.pastScales.length>10&&(this.pastScales=this.pastScales.slice(this.pastScales.length-10,this.pastScales.length)),c=new r.c(0,0,0),this.pastScales.forEach((function(t){c.add(t)})),c.divideScalar(this.pastScales.length),this.el.object3D.matrix=(new r.a).compose(s,a,c)}}});var l=i(13);Object(a.registerComponent)("click-interaction",{schema:{animal:{type:"string"}},isAnimationPlaying:!1,isSoundPlaying:!1,init:function(){var t=this,e=this.el,i=this.data.animal,n=this,o=document.querySelector("#sound_animal"),s=o.components.sound;e.parentNode.addEventListener("targetFound",(function(t){o.setAttribute("src","#sound_src_".concat(i)),e.setAttribute("data-clickable",""),console.log("targetFound")})),e.parentNode.addEventListener("targetLost",(function(){e.removeAttribute("data-clickable"),s.stopSound(),t.isSoundPlaying=!1,console.log("targetLost")})),"goat"===i&&document.querySelector("#goat").addEventListener("model-loaded",(function(t){var e=t.target.components["gltf-model"].model;n.animations=Object(l.a)(e.animations),n.baseAnimation=n.animations.splice(0,1)})),e.addEventListener("click",(function(t){if(n.isAnimationPlaying||n.isSoundPlaying)console.log("ignore, is playing");else if(s.playSound(),n.isSoundPlaying=!0,o.addEventListener("sound-ended",(function(){console.log("sound ended"),n.isSoundPlaying=!1})),"goat"===i){n.animations.sort((function(){return Math.random()-.5})),console.log(n.animations.slice(0,3).map((function(t){return t.name}))),n.isAnimationPlaying=!0;var e=document.querySelector("#goat");e.setAttribute("animation-mixer__0",{clips:n.animations.slice(0,3).map((function(t){return t.name})),loop:"once"}),e.addEventListener("animation-finished",(function(){n.isAnimationPlaying=!1}))}}))}}),Object(a.registerComponent)("sound-control",{init:function(){var t=this.el,e=document.querySelector("#sound").components.sound;t.parentNode.addEventListener("targetFound",(function(t){e.playSound()})),t.parentNode.addEventListener("targetLost",(function(){e.pauseSound()}))}});var d={once:a.THREE.LoopOnce,repeat:a.THREE.LoopRepeat,pingpong:a.THREE.LoopPingPong};Object(a.registerComponent)("animation-mixer",{multiple:!0,schema:{clips:{default:[],type:"array"},duration:{default:0},clampWhenFinished:{default:!1,type:"boolean"},crossFadeDuration:{default:0},loop:{default:"repeat",oneOf:Object.keys(d)},repetitions:{default:1/0,min:0},timeScale:{default:1}},init:function(){var t=this;this.model=null,this.mixer=null,this.activeActions=[];var e=this.el.getObject3D("mesh");e?this.load(e):this.el.addEventListener("model-loaded",(function(e){t.load(e.detail.model)}))},load:function(t){var e=this.el;this.model=t,this.mixer=new a.THREE.AnimationMixer(t),this.mixer.addEventListener("loop",(function(t){e.emit("animation-loop",{action:t.action,loopDelta:t.loopDelta})})),this.mixer.addEventListener("finished",(function(t){e.emit("animation-finished",{action:t.action,direction:t.direction})})),this.data.clips&&this.update({})},remove:function(){this.mixer&&this.mixer.stopAllAction()},update:function(t){if(t){var e=this.data,i=a.utils.diff(e,t);if("clips"in i)return this.stopAction(),void(e.clips&&this.playAction());this.activeActions.forEach((function(t){"duration"in i&&e.duration&&t.setDuration(e.duration),"clampWhenFinished"in i&&(t.clampWhenFinished=e.clampWhenFinished),("loop"in i||"repetitions"in i)&&t.setLoop(d[e.loop],e.repetitions),"timeScale"in i&&t.setEffectiveTimeScale(e.timeScale)}))}},stopAction:function(){for(var t=this.data,e=0;e<this.activeActions.length;e++)t.crossFadeDuration?this.activeActions[e].fadeOut(t.crossFadeDuration):this.activeActions[e].stop();this.activeActions.length=0},playAction:function(){if(this.mixer){var t=this.model,e=this.data,i=t.animations||(t.geometry||{}).animations||[];if(i.length)for(var n,o=0;n=i[o];o++)if(0===e.clips.length||e.clips.includes(n.name)){var s=this.mixer.clipAction(n,t);s.enabled=!0,s.clampWhenFinished=e.clampWhenFinished,e.duration&&s.setDuration(e.duration),1!==e.timeScale&&s.setEffectiveTimeScale(e.timeScale),s.setLoop(d[e.loop],e.repetitions).fadeIn(e.crossFadeDuration).play(),this.activeActions.push(s)}}},tick:function(t,e){this.mixer&&!isNaN(e)&&this.mixer.update(e/1e3)}});var u=i(9),m=function(t){var e=t.onClick;return Object(u.jsxs)("div",{style:{width:"100vw",height:"100vh",position:"fixed",zIndex:100,backgroundColor:"#ddc57d",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-end"},onClick:function(){var t=new Audio;t.autoplay=!0,t.src="data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV",null===e||void 0===e||e()},children:[Object(u.jsx)("span",{style:{flexGrow:2}}),Object(u.jsx)("img",{src:"https://tezdozen.xyz/images/title.png",alt:"logo",style:{maxHeight:"30%",maxWidth:"70%",aspectRatio:"771 / 149",marginBottom:20}}),Object(u.jsx)("span",{style:{flexGrow:1}}),Object(u.jsx)("span",{style:{color:"#00350D",fontWeight:"bold",flexBasis:1,lineHeight:1.5,textTransform:"uppercase",fontSize:"1.5rem"},children:"Click to Start"}),Object(u.jsx)("span",{style:{flexGrow:1}}),Object(u.jsx)("img",{src:"/AR-Workshop/target_image/goat.png",alt:"goat",style:{maxHeight:"50%",maxWidth:"90%",aspectRatio:"1"}})]})};V.a.registerComponent("model-adjustment",{init:function(){var t=this;this.el.addEventListener("model-loaded",(function(e){t.el.getObject3D("mesh")}))}});var p=["mouse","ox","tiger","rabbit","dragon","snake","horse","goat","monkey","rooster","dog","pig"],h=function(){var t=Object(n.useState)(!0),e=Object(c.a)(t,2),i=e[0],o=e[1];return Object(u.jsx)("div",{className:"container",children:i?Object(u.jsx)(m,{onClick:function(){o(!1)}}):Object(u.jsxs)("a-scene",{"mindar-image":"imageTargetSrc: /AR-Workshop/targets.mind; maxTrack: 1;","color-space":"sRGB",renderer:"colorManagement: true, physicallyCorrectLights","vr-mode-ui":"enabled: false","device-orientation-permission-ui":"enabled: false",children:[Object(u.jsxs)("a-assets",{children:[Object(u.jsx)("a-asset-item",{id:"snow",src:"/AR-Workshop/models/snow.glb"}),p.map((function(t,e){return Object(u.jsx)("a-asset-item",{id:"model_"+t,src:"/AR-Workshop/models/".concat(t,".glb")},t)})),Object(u.jsx)("a-asset-item",{id:"sound_src",preload:"auto",class:"a-sound",src:"/AR-Workshop/sound.m4a","response-type":"arraybuffer"}),p.map((function(t,e){return Object(u.jsx)("a-asset-item",{id:"sound_src_"+t,preload:"auto",class:"a-sound",src:"/AR-Workshop/sounds/".concat(t,".mp3"),"response-type":"arraybuffer"},t)}))]}),Object(u.jsx)("a-entity",{light:"type: ambient; color: #BBB"}),Object(u.jsx)("a-entity",{light:"type: directional; color: #FFF; intensity: 1",position:"0 1 1"}),Object(u.jsx)("a-camera",{position:"0 0 0","look-controls":"enabled: false",cursor:"fuse: false; rayOrigin: mouse;",raycaster:"far: 100000; objects: [data-clickable]"}),Object(u.jsx)("a-sound",{id:"sound",src:"#sound_src",loop:"true",positional:"false"}),Object(u.jsx)("a-sound",{id:"sound_animal",src:"",loop:"false",positional:"false"}),p.map((function(t,e){return Object(u.jsxs)("a-entity",{"mindar-image-target-averaging":"targetIndex: ".concat(e),children:[Object(u.jsx)("a-gltf-model",{id:t,rotation:"0 0 0",position:"0 0 0",scale:"0.5 0.5 0.5",src:"#model_".concat(t),"sound-control":!0,"animation-mixer":"clips: Animation"}),Object(u.jsx)("a-gltf-model",{id:t+"_snow",rotation:"0 0 0",position:"0 0 0",scale:"0.5 0.5 0.5",src:"#snow","animation-mixer":"clips: Animation","click-interaction":"animal: ".concat(t)})]},t)}))]})})};var g=function(){return Object(u.jsx)("div",{className:"App",children:Object(u.jsx)("div",{className:"container",children:Object(u.jsx)(h,{})})})},A=function(t){t&&t instanceof Function&&i.e(3).then(i.bind(null,75)).then((function(e){var i=e.getCLS,n=e.getFID,o=e.getFCP,s=e.getLCP,a=e.getTTFB;i(t),n(t),o(t),s(t),a(t)}))},f=i(46);s.a.render(Object(u.jsx)(f.a,{children:Object(u.jsx)(g,{})}),document.getElementById("root")),A()}},[[74,1,2]]]);
//# sourceMappingURL=main.00c6457b.chunk.js.map