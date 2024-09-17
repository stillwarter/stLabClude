<script setup>
/* 第一个three */

import * as three from "three"

// 场景预备
const scene = new three.Scene()
const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new three.WebGLRenderer()
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2, false)
document.body.appendChild(renderer.domElement)

// 实体预备
const geometry = new three.BoxGeometry(1, 1, 1)
const material = new three.MeshBasicMaterial({
    color: 0x00ff00
})
const cube = new three.Mesh(geometry, material)
scene.add(cube)
camera.position.z = 5

// 动画渲染
function animate() {
    requestAnimationFrame(animate)
    // 实体运动
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera)
}
animate()

</script>

<template>
    <div>
        <!-- this is firstthree -->
    </div>
</template>