<template>
  <div>
      <div class="demo-image__placeholder">
  <div class="block">
    <span class="demonstration">默认</span>
    <el-image :src="src"></el-image>
  </div>
  <div class="block">
    <span class="demonstration">自定义</span>
    <el-image :src="src">
      <div slot="placeholder" class="image-slot">
        加载中<span class="dot">...</span>
      </div>
    </el-image>
  </div>
</div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.images {
  height: 200px;
  border: 1px solid #e0e0e0;
}
.images img {
  width: 300px;
  height: 150px;
}

</style>