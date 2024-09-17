<script setup>
import { onMounted } from "vue"
/* three molecules分子结构 */
/* TODO-three 搞懂一半？ */
import * as THREE from 'three';

import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { PDBLoader } from 'three/addons/loaders/PDBLoader.js';
import { CSS3DRenderer, CSS3DObject, CSS3DSprite } from 'three/addons/renderers/CSS3DRenderer.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

/**
 * addons是three中的附加组件，他们通常是为了扩展或增强three功能开发的额外模块或者插件。
 */

let camera, scene, renderer;
let controls;
let root;

const objects = [];
const tmpVec1 = new THREE.Vector3();
const tmpVec2 = new THREE.Vector3();
const tmpVec3 = new THREE.Vector3();
const tmpVec4 = new THREE.Vector3();
const offset = new THREE.Vector3();

const loader = new PDBLoader();
const colorSpriteMap = {};
const baseSprite = document.createElement('img');

const VIZ_TYPE = {
    'Atoms': 0,
    'Bonds': 1,
    'Atoms + Bonds': 2
};

const MOLECULES = {
    'Ethanol': 'ethanol.pdb',
    'Aspirin': 'aspirin.pdb',
    'Caffeine': 'caffeine.pdb',
    'Nicotine': 'nicotine.pdb',
    'LSD': 'lsd.pdb',
    'Cocaine': 'cocaine.pdb',
    'Cholesterol': 'cholesterol.pdb',
    'Lycopene': 'lycopene.pdb',
    'Glucose': 'glucose.pdb',
    'Aluminium oxide': 'Al2O3.pdb',
    'Cubane': 'cubane.pdb',
    'Copper': 'cu.pdb',
    'Fluorite': 'caf2.pdb',
    'Salt': 'nacl.pdb',
    'YBCO superconductor': 'ybco.pdb',
    'Buckyball': 'buckyball.pdb',
    // 'Diamond': 'diamond.pdb',
    'Graphite': 'graphite.pdb'
};

const params = {
    vizType: 2,
    molecule: 'caffeine.pdb'
};

onMounted(() => {
    init();
    animate();
})


function init() {
    // 基础环境
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 5000)
    camera.position.z = 1000
    scene = new THREE.Scene()
    root = new THREE.Object3D()
    scene.add(root)

    /**
     * 核心：Object3D
     * 
     * three提供了一系列的属性和方法来对三位空间中对物体进行操纵。
     * obj3D是大多3d对象的基类，为three中各种3d对象提高基本的架构和操作接口，
     * 是构建3维场景的重要基础。
     */

    // 添加渲染器
    renderer = new CSS3DRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.getElementById('container').appendChild(renderer.domElement);

    /**
     * css3drenderer是three中的一个渲染器。
     * 它使用css3d变换来渲染3d场景，与其他渲染器不同，它利用浏览器对
     * css3d变换的支持，而不是依赖于webgl等图形api。
     * 
     * css3drenderer有更好的兼容性，对于简单的3d效果实现也比较简单。
     * 
     * 它的局限性是对于复杂的3d场景和大量几何图形渲染效果可能不理想。
     */

    // 轨道控制器
    controls = new TrackballControls(camera, renderer.domElement)
    controls.rotateSpeed = 0.5

    /**
     * trackballcontrols
     * 它是three中的一种交互控制类，它允许用户通过鼠标或触摸操作来旋转，平移
     * 和缩放3d场景，就像操作一个虚拟的球体一样。
     * 
     * 使用trackballcontrols可以极大提升用户与3d场景的交互体验，使其能够更直观地
     * 探索和观察3d模型或场景。
     */

    baseSprite.onload = function () {
        loadMolecule(params.molecule);
    };

    /**
     * baseSprite是提前声明的image元素，在这里使用相对链接读取不到
     * 必须使用'src/components/Start/examples/textures/sprites/ball.png'这样的
     * 
     * 这里用image的onload事件驱动模型的加载
     */

    // baseSprite.src = './textures/sprites/ball.png';
    baseSprite.src = 'src/components/Start/examples/textures/sprites/ball.png';

    window.addEventListener('resize', onWindowResize);

    const gui = new GUI();

    gui.add(params, 'vizType', VIZ_TYPE).onChange(changeVizType);
    // gui.add(params, 'molecule', MOLECULES).onChange(loadMolecule);
    gui.open();
}

function animate() {
    requestAnimationFrame(animate)
    controls.update()
    const time = Date.now() * 0.0004
    root.rotation.x = time
    root.rotation.y = time * 0.6
    render()
}

function render() {
    renderer.render(scene, camera)
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

function changeVizType(value) {
    if (value === 0) showAtoms();
    else if (value === 1) showBonds();
    else showAtomsBonds();
}

function showAtoms() {

    for (let i = 0; i < objects.length; i++) {

        const object = objects[i];

        if (object instanceof CSS3DSprite) {

            object.element.style.display = '';
            object.visible = true;

        } else {

            object.element.style.display = 'none';
            object.visible = false;

        }

    }

}

function showBonds() {

    for (let i = 0; i < objects.length; i++) {

        const object = objects[i];

        if (object instanceof CSS3DSprite) {

            object.element.style.display = 'none';
            object.visible = false;

        } else {

            object.element.style.display = '';
            object.element.style.height = object.userData.bondLengthFull;
            object.visible = true;

        }

    }

}

function showAtomsBonds() {

    for (let i = 0; i < objects.length; i++) {

        const object = objects[i];

        object.element.style.display = '';
        object.visible = true;

        if (!(object instanceof CSS3DSprite)) {

            object.element.style.height = object.userData.bondLengthShort;

        }

    }

}

function imageToCanvas(image) {

    const width = image.width;
    const height = image.height;

    const canvas = document.createElement('canvas');

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, width, height);

    return canvas;

}

/**
 * pdb模型加载
 * 
 * pdb模型是一种用于存储生物大分子三位信息的三维结构信息的数据库模式
 */
function loadMolecule(model) {
    // url设置
    const url = 'src/components/Start/examples/models/pdb/' + model;
    // 没搞懂？
    for (let i = 0; i < objects.length; i++) {
        const object = objects[i];
        object.parent.remove(object);
    }
    // objects置空
    objects.length = 0;
    // pdb loader模型加载
    loader.load(url, function (pdb) {
        const geometryAtoms = pdb.geometryAtoms;
        const geometryBonds = pdb.geometryBonds;
        const json = pdb.json;
        geometryAtoms.computeBoundingBox();
        geometryAtoms.boundingBox.getCenter(offset).negate();

        geometryAtoms.translate(offset.x, offset.y, offset.z);
        geometryBonds.translate(offset.x, offset.y, offset.z);

        const positionAtoms = geometryAtoms.getAttribute('position');
        const colorAtoms = geometryAtoms.getAttribute('color');

        const position = new THREE.Vector3();
        const color = new THREE.Color();

        for (let i = 0; i < positionAtoms.count; i++) {

            position.fromBufferAttribute(positionAtoms, i);
            color.fromBufferAttribute(colorAtoms, i);

            const atomJSON = json.atoms[i];
            const element = atomJSON[4];

            if (!colorSpriteMap[element]) {

                const canvas = imageToCanvas(baseSprite);
                const context = canvas.getContext('2d');

                colorify(context, canvas.width, canvas.height, color);

                const dataUrl = canvas.toDataURL();

                colorSpriteMap[element] = dataUrl;

            }

            const colorSprite = colorSpriteMap[element];

            const atom = document.createElement('img');
            atom.src = colorSprite;

            const object = new CSS3DSprite(atom);
            object.position.copy(position);
            object.position.multiplyScalar(75);

            object.matrixAutoUpdate = false;
            object.updateMatrix();

            root.add(object);

            objects.push(object);

        }

        const positionBonds = geometryBonds.getAttribute('position');

        const start = new THREE.Vector3();
        const end = new THREE.Vector3();

        for (let i = 0; i < positionBonds.count; i += 2) {

            start.fromBufferAttribute(positionBonds, i);
            end.fromBufferAttribute(positionBonds, i + 1);

            start.multiplyScalar(75);
            end.multiplyScalar(75);

            tmpVec1.subVectors(end, start);
            const bondLength = tmpVec1.length() - 50;

            //

            let bond = document.createElement('div');
            bond.className = 'bond';
            bond.style.height = bondLength + 'px';

            let object = new CSS3DObject(bond);
            object.position.copy(start);
            object.position.lerp(end, 0.5);

            object.userData.bondLengthShort = bondLength + 'px';
            object.userData.bondLengthFull = (bondLength + 55) + 'px';

            //

            const axis = tmpVec2.set(0, 1, 0).cross(tmpVec1);
            const radians = Math.acos(tmpVec3.set(0, 1, 0).dot(tmpVec4.copy(tmpVec1).normalize()));

            const objMatrix = new THREE.Matrix4().makeRotationAxis(axis.normalize(), radians);
            object.matrix.copy(objMatrix);
            object.quaternion.setFromRotationMatrix(object.matrix);

            object.matrixAutoUpdate = false;
            object.updateMatrix();

            root.add(object);

            objects.push(object);

            //

            const joint = new THREE.Object3D();
            joint.position.copy(start);
            joint.position.lerp(end, 0.5);

            joint.matrix.copy(objMatrix);
            joint.quaternion.setFromRotationMatrix(joint.matrix);

            joint.matrixAutoUpdate = false;
            joint.updateMatrix();

            bond = document.createElement('div');
            bond.className = 'bond';
            bond.style.height = bondLength + 'px';

            object = new CSS3DObject(bond);
            object.rotation.y = Math.PI / 2;

            object.matrixAutoUpdate = false;
            object.updateMatrix();

            object.userData.bondLengthShort = bondLength + 'px';
            object.userData.bondLengthFull = (bondLength + 55) + 'px';

            object.userData.joint = joint;

            joint.add(object);
            root.add(joint);

            objects.push(object);

        }

        //console.log( "CSS3DObjects:", objects.length );

        changeVizType(params.vizType);

    });


}

function colorify(ctx, width, height, color) {

    const r = color.r, g = color.g, b = color.b;

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    for (let i = 0, l = data.length; i < l; i += 4) {

        data[i + 0] *= r;
        data[i + 1] *= g;
        data[i + 2] *= b;

    }

    ctx.putImageData(imageData, 0, 0);

}

</script>

<template>
    <div>
        this is molecules
    </div>
    <div id="container"></div>
    <!-- <img src="./textures/sprites/ball.png" alt=""> -->
</template>