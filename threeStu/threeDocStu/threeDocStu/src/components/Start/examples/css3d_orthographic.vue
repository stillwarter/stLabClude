<script setup>
/**
 * orthographic 正交的 正射的？
 */
import { onMounted } from "vue"
import * as THREE from "three"

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

/**
 * orbitcontrols
 * 
 * 通常指的是一种用于实现视角环绕中心点，缩放，平移的控制机制或者类库。
 */

let camera, scene, renderer;
let scene2, renderer2;
const frustumSize = 500;

onMounted(() => {
    init()
    animate()
})

function init() {
    // 相机和场景准备
    const aspect = window.innerWidth / window.innerHeight
    camera = new THREE.OrthographicCamera(
        (frustumSize * aspect) / -2,
        (frustumSize * aspect) / 2,
        frustumSize / 2,
        frustumSize / -2,
        1,
        1000
    )
    /**
     * molecules那个例子用的 PerspectiveCamera，而这里用的orthographicCamera（正交相机？)
     * 正交相机的特点是无论物体距离摄像机的远近，其在屏幕上的大小都保持不变，不会产生
     * 近大远小的透视效果，在需要精确测量和布局的场景有用，比如建筑设计，工程制图这种。
     * 
     * 它的参数：
     * left--渲染空间的左边界
     * right--渲染空间的右边界
     * top，bottom（一样）
     * near--表示从距离相机多远的位置开始渲染，一般回设置一个很小的值，默认0.1
     * far--表示距离相机多远的位置截至渲染，默认1000
     */
    camera.position.set(-200, 200, 200)


    // 场景设置
    /**
     * 这里设置了2个场景 一个是带有透明颜色的3d，一个是非wireframe的线框3d
     */
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf0f0f0)
    scene2 = new THREE.Scene()
    const material = new THREE.MeshBasicMaterial({
        color: 0x000000,
        wireframe: true,
        wireframeLinewidth: 1,
        side: THREE.DoubleSide
    })
    /**
     * meshbasicmaterial 是three的一种基础材质内容 这种材料不受光照影响。
     * 参数：
     * color--定义材质的颜色，可以是十六进制的颜色值
     * wireframe--一个布尔值，觉得是否以线框模式显示网格，若为false（默认），
     * 则显示为线框，为true，则显示为实体填充（网格的）。
     * 
     * 有关wireframe的更多说明--设置wireframe后，three的平面会显示线，也就是
     * 说，设置这个属性后，一个平面会出现一条斜线，说明一个矩形平面有2个三级组成，
     * 不设置这个属性，则不会出现这条斜线。
     * 
     * opcity--材质不透明度
     * 
     * transparent--布尔值，说明材料是否透明
     * 
     * wireframeLinewidth--控制线框宽度，默认为1
     * 
     * side--在材质里，side值默认为THREE.FrontSide也就是在正面显示材质。
     * 还有THREE.BackSide,THREE.DoubleSide,在背面，在两面显示。
     */

    // 平面绘制
    // left
    createPlane(
        100,
        100,
        "chocolate",
        new THREE.Vector3(-50, 0, 0),
        /**
         * vector3
         * 属于three的数学库
         * 该类表示一个三位向量，可以表示三维空间中的点，任意有顺序的3个数的组合
         * 方法：
         * add(vector3) 向量相加
         * addscalar 向量加标量 这3个数统一加一个数
         * 方法很多不赘述
         */
        new THREE.Euler(0, -90 * THREE.MathUtils.DEG2RAD, 0)
        /**
         * Euler
         * 属于three的数学库
         * 该类称为欧拉角，欧拉角描述一个旋转变换，通过指定轴顺序和其各个轴向上的指定
         * 旋转角度来旋转一个物体
         * 构造器默认4个参数：
         * x--用弧度表示x轴旋转量，默认为0，弧度
         * y--用弧度表示y轴旋转量，默认为0，弧度
         * z--用弧度表示z轴旋转量，默认为0，弧度
         * order--表示旋转顺序的字符串，默认为XYZ（必须是大写）
         */
        /**
         * MathUtils
         * 属于three的数学库
         * 该类是具有多个数学实用函数的对象
         * 这里的deg2rad同degtorad 将度转换为弧度
         */
    );
    // right
    createPlane(
        100,
        100,
        "saddlebrown",
        new THREE.Vector3(0, 0, 50),
        new THREE.Euler(0, 0, 0)
    );
    // top
    createPlane(
        100,
        100,
        "yellowgreen",
        new THREE.Vector3(0, 50, 0),
        new THREE.Euler(-90 * THREE.MathUtils.DEG2RAD, 0, 0)
    );
    // bottom
    createPlane(
        300,
        300,
        "seagreen",
        new THREE.Vector3(0, -50, 0),
        new THREE.Euler(-90 * THREE.MathUtils.DEG2RAD, 0, 0)
    );


    // 添加渲染器
    renderer = new THREE.WebGLRenderer()
    // renderer.setPixelRatio(window.devicePixelRatio)  // 设置像素比
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    renderer2 = new CSS3DRenderer()
    renderer2.setSize(window.innerWidth, window.innerHeight)
    // 设置render2的渲染位置
    renderer2.domElement.style.position = "absolute"
    renderer2.domElement.style.top = 0
    renderer2.domElement.style.left = 63 + "px"
    document.body.appendChild(renderer2.domElement)

    const controls = new OrbitControls(camera, renderer2.domElement)
    controls.minZoom = 0.5
    controls.maxZoom = 2

    /* 创建平面 */
    function createPlane(width, height, cssColor, pos, rot) {
        // 创建div dom 
        const element = document.createElement('div')
        element.style.width = width + "px"
        element.style.height = height + "px"
        element.style.opacity = 0.75
        element.style.background = cssColor

        // 创建3d对象并设置属性
        const object = new CSS3DObject(element)
        object.position.copy(pos)
        object.rotation.copy(rot)
        // scene2.add(object)

        // 创建plane图形
        const geometry = new THREE.PlaneGeometry(width, height)
        /**
         * PlaneGeometry
         * 它是three的平面几何体，可以设置其宽高来定义平面大小，用于构建各种场景中的平面元素，比如地面或墙壁。
         */
        const mesh = new THREE.Mesh(geometry, material)
        /**
         * Mesh
         * 是three的网格对象，通常由几何形状（palneGeometry,BoxGeometry)和材质组成
         */
        mesh.position.copy(object.position)
        mesh.rotation.copy(object.rotation)
        // mesh.position.copy(pos)
        // mesh.rotation.copy(rot)

        scene.add(mesh)

        window.addEventListener("resize", onWindowResize);

    }
}

/* 尺寸变化 */
function onWindowResize() {
    const aspect = window.innerWidth / window.innerHeight
    camera.left = (-frustumSize * aspect) / 2
    camera.right = (frustumSize * aspect) / 2
    camera.top = frustumSize / 2
    camera.bottom = -frustumSize / 2
    camera.updateProjectionMatrix()
    /**
     * updateProjectionMatrix
     * 当相机的参数发生变化时，更新相机的投影矩阵。
     * 当你更改了相机的某些属性，例如视场角 (fov)、宽高比 (aspect)、近剪切面 (near) 或远剪切面 (far) 后，需要调用此方法来更新投影矩阵。
     * 在响应窗口大小变化的函数（如 onWindowResize）中，通常会调用此方法以确保投影矩阵与新的窗口尺寸匹配。
     */
    renderer.setSize(window.innerWidth / window.innerHeight)
    renderer2.setSize(window.innerWidth / window.innerHeight)
}

/* 进行渲染 */
function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    renderer2.render(scene2, camera)
}

/* GUI创建 */
function createPanel() {

}



</script>

<template>
    <div>
        <!-- this is orthographic -->
    </div>
</template>