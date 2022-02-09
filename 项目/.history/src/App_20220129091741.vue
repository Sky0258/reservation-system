<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import home from "./views/home.vue";

export default {
  name: "App",
  components: {
    // home,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
@font-face {
  font-family: 'iconfont';  /* Project id 3141904 */
  src: url('//at.alicdn.com/t/font_3141904_z7yk1wblmpi.woff2?t=1643419043169') format('woff2'),
       url('//at.alicdn.com/t/font_3141904_z7yk1wblmpi.woff?t=1643419043169') format('woff'),
       url('//at.alicdn.com/t/font_3141904_z7yk1wblmpi.ttf?t=1643419043169') format('truetype');
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
body{
  margin: 0;
  padding: 0;
}
</style>
