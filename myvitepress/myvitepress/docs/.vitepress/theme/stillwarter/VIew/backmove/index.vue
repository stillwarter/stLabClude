<template>
  <div class="vitepressFooterMove">
    <canvas id="myCanvas" ref="el" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { isMobile, getTheme } from "../../Utils/index.js";
const el = ref();
let pendingTasks: Function[] = [];

const pcClearTime = 10000;
const mobileClearTime = 8000;

interface Point {
  x: number;
  y: number;
}

interface Branch {
  start: Point;
  length: number;
  theta: number;
}

const unuseUrl = ["myFriends", "aboutMe"];
function useBM() {
  let flg = true;
  for (const item of unuseUrl) {
    if (window.location.href.includes(item)) {
      flg = false;
      break;
    }
  }
  return flg;
}

onMounted(() => {
  canvaSetSize();
  window.onresize = function () {
    const canvas: any = canvaSetSize();
    const ctx = el.value.getContext("2d");
    setTimeout(() => {
      pendingTasks = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (useBM()) {
        init(ctx);
      }
    }, 1000);
  };

  const ctx = el.value.getContext("2d");

  // if (!isMobile()) {
  //   init(ctx);
  // }
  setTimeout(() => {
    if (useBM()) {
      init(ctx);
    }
  }, 2000);

  function init(ctx) {
    const classn = getTheme();
    if (classn == "day") {
      ctx.strokeStyle = "#aaa";
    } else {
      ctx.strokeStyle = "#777";
    }

    step(
      {
        start: { x: 0, y: 64 },
        length: 3,
        theta: Math.PI / 3,
      },
      0,
      ctx
    );

    step(
      {
        start: { x: window.innerWidth, y: window.innerHeight },
        length: 2,
        theta: -(Math.PI / 1.5),
      },
      0,
      ctx
    );

    setTimeout(
      () => {
        pendingTasks = [];
      },
      isMobile() ? mobileClearTime : pcClearTime
    );
  }

  function step(b: Branch, depth = 0, ctx) {
    const end = getEndPoint(b);
    drawBranch(b, ctx);

    if (depth < 6 || Math.random() < 0.5) {
      pendingTasks.push(() =>
        step(
          {
            start: end,
            length: b.length + (Math.random() * 1 - 0.5),
            theta: b.theta - 0.3 * Math.random(),
          },
          depth + 1,
          ctx
        )
      );
    }
    if (depth < 6 || Math.random() < 0.5) {
      pendingTasks.push(() =>
        step(
          {
            start: end,
            length: b.length + (Math.random() * 1 - 0.5),
            theta: b.theta + 0.3 * Math.random(),
          },
          depth + 1,
          ctx
        )
      );
    }
  }

  function frame() {
    const tasks: Function[] = [];
    pendingTasks = pendingTasks.filter((i) => {
      if (Math.random() > 0.6) {
        tasks.push(i);
        return false;
      }
      return true;
    });
    tasks.forEach((fn) => fn());
  }

  let framesCount = 0;
  function startFrame() {
    requestAnimationFrame(() => {
      framesCount += 1;
      if (framesCount % 4 === 0) frame();
      startFrame();
    });
  }

  startFrame();

  function lineTo(p1: Point, p2: Point, ctx) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }

  function getEndPoint(b: Branch): Point {
    return {
      x: b.start.x + b.length * Math.cos(b.theta),
      y: b.start.y + b.length * Math.sin(b.theta),
    };
  }

  function drawBranch(b: Branch, ctx) {
    lineTo(b.start, getEndPoint(b), ctx);
  }
});

function canvaSetSize() {
  const canvas: any = document.getElementById("myCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  return canvas;
}
</script>

<style lang="less" scoped>
.vitepressFooterMove {
  position: fixed;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
