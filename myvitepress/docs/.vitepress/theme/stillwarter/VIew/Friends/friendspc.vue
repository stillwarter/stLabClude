<template>
  <div class="threedtry">
    <div id="container"></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import * as THREE from "three";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/addons/renderers/CSS3DRenderer.js";
import TWEEN from "three/addons/libs/tween.module.js";

/**
 * 相机，场景，渲染器是不可缺少的
 *
 * 相机决定在三位场景中观察的视角和范围
 * 场景将所有的物体，光源，相机集合在一起，再页面上形成3d效果
 * 渲染器负责将3d数据转换为2d图形
 */
let camera, scene, renderer;
/**
 * controls 轨道控制器，用于控制整个3d场景（大概吧）
 */
let controls;
/**
 *
 */
const objects = [];
const targets = { table: [], sphere: [], helix: [], grid: [] };

/* three场景初始化并加入到dom元素 */
const Css3DInit = () => {
  camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 3000;
  scene = new THREE.Scene();
  renderer = new CSS3DRenderer();
  //
  create3DObj();
  // 设置渲染范围并添加到dom
  renderer.setSize(window.innerWidth , window.innerHeight - 64);
  document.getElementById("container").appendChild(renderer.domElement);

  transform(targets.table, 2000);
};

/* 创建一个css3d对象 */
const create3DObj = () => {
  const ele = document.createElement("div");
  ele.className = "ele";

  const number = document.createElement("div");
  number.className = "num";
  number.textContent = 12;
  ele.appendChild(number);

  const objectCSS = new CSS3DObject(ele);
  objectCSS.position.x = Math.random() * 4000 - 2000;
  objectCSS.position.y = Math.random() * 4000 - 2000;
  objectCSS.position.z = Math.random() * 4000 - 2000;
  scene.add(objectCSS);

  objects.push(objectCSS);
  const object = new THREE.Object3D();
  // object.position.x = (table[i + 3] * 140) - 1530;
  // object.position.y = - (table[i + 4] * 180) + 990;

  targets.table.push(object);
};

function render() {
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
  // controls.update()
}

function transform(targets, duration) {
  TWEEN.removeAll();
  for (let i = 0; i < objects.length; i++) {
    const object = objects[i];
    const target = targets[i];
    new TWEEN.Tween(object.position)
      .to(
        { x: target.position.x, y: target.position.y, z: target.position.z },
        Math.random() * duration + duration
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();

    new TWEEN.Tween(object.rotation)
      .to(
        { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z },
        Math.random() * duration + duration
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();
  }
  new TWEEN.Tween(this)
    .to({}, duration * 2)
    .onUpdate(render)
    .start();
}

/* */
onMounted(() => {
  Css3DInit();
  animate();
});
</script>

<style lang="less">
.homepcbox {
  /* width: 100%; */
  max-width: 700px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 12px;

  .hometitle {
    margin-top: 30px;
    font-size: 20px;
    margin-bottom: 2rem;
  }
}

.threedtry {
  .ele {
    width: 120px;
    height: 160px;
    box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.5);
    border: 1px solid rgba(127, 255, 255, 0.25);
    font-family: Helvetica, sans-serif;
    text-align: center;
    line-height: normal;
    cursor: default;
  }

  .ele:hover {
    box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.75);
    border: 1px solid rgba(127, 255, 255, 0.75);
  }

  .ele .num {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 12px;
    color: rgba(127, 255, 255, 0.75);
  }
}
</style>
