<template>
  <div class="contentClass">
    <iframe src="http://whalex-kibana:5601/app/kibana#/discover" class="sentinelClass" frameborder="0" />
  </div>
</template>

<script>
export default {
  name: 'Sentinel'
}
</script>

<style scoped>
  .contentClass{
    width: 100%;
    overflow: hidden;
    position: absolute;
  }

  .sentinelClass{
    position: relative;
    width: 100%;
    overflow: hidden;
    min-height: calc(100vh - 88px);
    max-height: calc(100vh - 88px);
  }
</style>
