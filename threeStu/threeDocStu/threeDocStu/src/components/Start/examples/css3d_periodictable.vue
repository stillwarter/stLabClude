<script setup>
import { onMounted } from "vue"
import * as THREE from 'three';
import TWEEN from 'three/addons/libs/tween.module.js';
/**
 * tween是一个用于实现动画过渡效果的库或功能。
 * 跨域帮助在不同数值，位置颜色等属性之间创建平滑的过渡效果
 */
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { pretable as table } from "./3ddate/periodictable.js"

let camera, scene, renderer;
let controls;

const objects = [];
const targets = { table: [], sphere: [], helix: [], grid: [] };

onMounted(() => {
    init()
    animate()
})

function init() {
    // 摄像机，场景准备
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000)
    camera.position.z = 3000
    scene = new THREE.Scene()

    // table
    tableinit()
    // sphere
    const vector = new THREE.Vector3();
    sphereInit(vector)
    // helix
    helixInit(vector)
    // grid
    gridInit()

    // 渲染器准备
    renderer = new CSS3DRenderer()
    /**
     * css3drender
     * 是一个附加组件，必须显示导入
     * 
     * css3drenderer通过css的transform属性，将层次的3d变换应用到dom元素上。
     * 若你希望借助基于canvas的渲染来在你的网站上应用3d变换，它可以将dom元素和webgl内容结合。
     * 
     * 这个渲染器也有限制：
     * 1.不能使用threejs的材质系统
     * 2.同时也不能使用几何体
     * 3.只能被浏览器支持？
     */
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.getElementById("container").appendChild(renderer.domElement)

    // 
    controls = new TrackballControls(camera, renderer.domElement)
    /**
     * TrackballControls
     * 
     * 轨迹球控制器
     * 与OrbitControls相似，但它不能恒定摄像机的up向量，这意味着摄影机绕过
     * 南北极，则不会翻转保持右侧朝上。
     */
    controls.minDistance = 500
    controls.maxDistance = 6000
    controls.addEventListener('change', render)

    // 
    const buttonTable = document.getElementById('table');
    buttonTable.addEventListener('click', function () {
        transform(targets.table, 2000);
    });

    const buttonSphere = document.getElementById('sphere');
    buttonSphere.addEventListener('click', function () {
        transform(targets.sphere, 2000);
    });

    const buttonHelix = document.getElementById('helix');
    buttonHelix.addEventListener('click', function () {
        transform(targets.helix, 2000);
    });

    const buttonGrid = document.getElementById('grid');
    buttonGrid.addEventListener('click', function () {
        transform(targets.grid, 2000);
    });

    transform(targets.table, 2000);

    //

    window.addEventListener('resize', onWindowResize);

}

function transform(targets, duration) {
    TWEEN.removeAll()
    for (let i = 0; i < objects.length; i++) {
        const object = objects[i]
        const target = targets[i]
        new TWEEN.Tween(object.position)
            .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start()

        new TWEEN.Tween(object.rotation)
            .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start()
    }
    new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(render)
        .start()
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function render() {
    renderer.render(scene, camera)
}

function animate() {
    requestAnimationFrame(animate)
    TWEEN.update()
    controls.update()
}

/* table类型初始化 */
function tableinit() {
    for (let i = 0; i < table.length; i += 5) {
        // div元素创建
        const element = document.createElement('div')
        element.className = 'element'
        element.style.backgroundColor = "rgba(0,127,127," + (Math.random() * 0.5 + 0.25) + ")"

        // number元素创建
        const number = document.createElement('div');
        number.className = 'number';
        number.textContent = (i / 5) + 1;
        element.appendChild(number);

        // 
        const symbol = document.createElement('div');
        symbol.className = 'symbol';
        symbol.textContent = table[i];
        element.appendChild(symbol);

        const details = document.createElement('div');
        details.className = 'details';
        details.innerHTML = table[i + 1] + '<br>' + table[i + 2];
        element.appendChild(details);

        const objectCSS = new CSS3DObject(element);
        objectCSS.position.x = Math.random() * 4000 - 2000;
        objectCSS.position.y = Math.random() * 4000 - 2000;
        objectCSS.position.z = Math.random() * 4000 - 2000;
        scene.add(objectCSS);

        objects.push(objectCSS);
        const object = new THREE.Object3D();
        object.position.x = (table[i + 3] * 140) - 1530;
        object.position.y = - (table[i + 4] * 180) + 990;

        targets.table.push(object);
    }
}

function sphereInit(vector) {
    for (let i = 0, l = objects.length; i < l; i++) {
        const phi = Math.acos(- 1 + (2 * i) / l);
        const theta = Math.sqrt(l * Math.PI) * phi;
        const object = new THREE.Object3D();
        object.position.setFromSphericalCoords(800, phi, theta);
        vector.copy(object.position).multiplyScalar(2);
        object.lookAt(vector);
        targets.sphere.push(object);
    }
}

function helixInit(vector) {
    for (let i = 0, l = objects.length; i < l; i++) {
        const theta = i * 0.175 + Math.PI;
        const y = - (i * 8) + 450;
        const object = new THREE.Object3D();
        object.position.setFromCylindricalCoords(900, theta, y);
        vector.x = object.position.x * 2;
        vector.y = object.position.y;
        vector.z = object.position.z * 2;
        object.lookAt(vector);
        targets.helix.push(object);
    }
}

function gridInit() {
    for (let i = 0; i < objects.length; i++) {
        const object = new THREE.Object3D();
        object.position.x = ((i % 5) * 400) - 800;
        object.position.y = (- (Math.floor(i / 5) % 5) * 400) + 800;
        object.position.z = (Math.floor(i / 25)) * 1000 - 2000;
        targets.grid.push(object);
    }
}

</script>

<template>
    <div class="periodictable">
        <div id="info"><a href="https://threejs.org" target="_blank" rel="noopener">three.js</a> css3d - periodic table.
        </div>
        <div id="container"></div>
        <div id="menu">
            <button id="table">TABLE</button>
            <button id="sphere">SPHERE</button>
            <button id="helix">HELIX</button>
            <button id="grid">GRID</button>
        </div>
    </div>
</template>

<style lang="less">
.periodictable {
    width: 90vw;
    height: 90vh;
    box-sizing: border-box;

    a {
        color: #8ff;
    }

    #menu {
        position: absolute;
        bottom: 20px;
        width: 100%;
        text-align: center;
    }

    .element {
        width: 120px;
        height: 160px;
        box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.5);
        border: 1px solid rgba(127, 255, 255, 0.25);
        font-family: Helvetica, sans-serif;
        text-align: center;
        line-height: normal;
        cursor: default;
    }

    .element:hover {
        box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.75);
        border: 1px solid rgba(127, 255, 255, 0.75);
    }

    .element .number {
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 12px;
        color: rgba(127, 255, 255, 0.75);
    }

    .element .symbol {
        position: absolute;
        top: 40px;
        left: 0px;
        right: 0px;
        font-size: 60px;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.75);
        text-shadow: 0 0 10px rgba(0, 255, 255, 0.95);
    }

    .element .details {
        position: absolute;
        bottom: 15px;
        left: 0px;
        right: 0px;
        font-size: 12px;
        color: rgba(127, 255, 255, 0.75);
    }

    button {
        color: rgba(127, 255, 255, 0.75);
        background: transparent;
        outline: 1px solid rgba(127, 255, 255, 0.75);
        border: 0px;
        padding: 5px 10px;
        cursor: pointer;
    }

    button:hover {
        background-color: rgba(0, 255, 255, 0.5);
    }

    button:active {
        color: #000000;
        background-color: rgba(0, 255, 255, 0.75);
    }
}
</style>