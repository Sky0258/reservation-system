<template>
  <div id="app">
    
    <home></home>
  </div>
</template>

<script>
import home from "./views/home.vue";

export default {
  name: "App",
  components: {
    home,
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
  margin-top: 60px;
}
@font-face {
  font-family: "iconfont"; /* Project id 3141904 */
  src: url("//at.alicdn.com/t/font_3141904_z3iq647vroo.woff2?t=1642144911941")
      format("woff2"),
    url("//at.alicdn.com/t/font_3141904_z3iq647vroo.woff?t=1642144911941")
      format("woff"),
    url("//at.alicdn.com/t/font_3141904_z3iq647vroo.ttf?t=1642144911941")
      format("truetype");
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
