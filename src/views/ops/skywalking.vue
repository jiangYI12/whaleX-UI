<template>
  <div class="contentClass">
    <iframe src="http://whalex-skywalking:10100" class="skywalkingClass" frameborder="0" />
  </div>
</template>

<script>
export default {
  name: 'Skywalking'
}
</script>

<style scoped>
  .contentClass{
    width: 100%;
    overflow: hidden;
    position: absolute;
  }

  .skywalkingClass{
    position: relative;
    width: 100%;
    overflow: hidden;
    min-height: calc(100vh - 88px);
    max-height: calc(100vh - 88px);
  }
</style>
