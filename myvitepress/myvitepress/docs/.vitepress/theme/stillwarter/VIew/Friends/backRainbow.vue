<template>
  <div class="rainbox">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.rainbox {
  position: absolute;
  top: -64px;
  min-height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: center;
  background-color: var(--bg-base);
  background-repeat: no-repeat;

  background-image: radial-gradient(
      closest-side,
      var(--bg-rainbow-c1),
      var(--bg-rainbow-c1d)
    ),
    radial-gradient(closest-side, var(--bg-rainbow-c2), var(--bg-rainbow-c2d)),
    radial-gradient(closest-side, var(--bg-rainbow-c3), var(--bg-rainbow-c3d)),
    radial-gradient(closest-side, var(--bg-rainbow-c4), var(--bg-rainbow-c4d)),
    radial-gradient(closest-side, var(--bg-rainbow-c5), var(--bg-rainbow-c5d));
  background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax,
    110vmax 110vmax, 90vmax 90vmax;
  background-position: -60vmax -60vmax, 60vmax -30vmax, 10vmax 10vmax,
    -30vmax -10vmax, 50vmax 50vmax;

  animation: 24s movement ease infinite;

  @keyframes movement {
    0%,
    100% {
      background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax,
        110vmax 110vmax, 90vmax 90vmax;
      background-position: 40vmax 40vmax, 60vmax -30vmax, 10vmax 10vmax,
        -30vmax -10vmax, 50vmax 50vmax;
    }

    25% {
      background-size: 100vmax 100vmax, 90vmax 90vmax, 100vmax 100vmax,
        90vmax 90vmax, 60vmax 60vmax;
      background-position: -60vmax -90vmax, 50vmax -40vmax, 0vmax -10vmax,
        -40vmax -20vmax, 40vmax 60vmax;
    }

    50% {
      background-size: 80vmax 80vmax, 110vmax 110vmax, 80vmax 80vmax,
        60vmax 60vmax, 80vmax 80vmax;
      background-position: -50vmax -70vmax, 40vmax -30vmax, 10vmax 0vmax,
        -20vmax 10vmax, 30vmax 50vmax;
    }

    75% {
      background-size: 90vmax 90vmax, 90vmax 90vmax, 100vmax 100vmax,
        90vmax 90vmax, 60vmax 60vmax;
      background-position: -40vmax -20vmax, 50vmax -30vmax, 20vmax 0vmax,
        -10vmax 10vmax, 30vmax 70vmax;
    }
  }
}
</style>
