import TWEEN from "three/addons/libs/tween.module.js";
import { CSS3DRenderer } from "three/addons/renderers/CSS3DRenderer.js";

export function defalThreeInit() {
  return {
    camera: new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      10000
    ),
    scene: new THREE.Scene(),
    renderer: new CSS3DRenderer(),
  };
}
