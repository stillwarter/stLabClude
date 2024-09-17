<script setup>
/* three 画线 */
import * as THREE from "three"
// 环境准备
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

// 定义材质
const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

// 准备顶点
const points = [];
points.push(new THREE.Vector3(- 10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);

// 线条渲染
const line = new THREE.Line(geometry, material);
// scene.add(line);
// 文字
const texxt = new THREE.TextGeometry("text");
scene.add(texxt);
renderer.render(scene, camera);
</script>

<template>
    <div>
        this is line
    </div>
</template>