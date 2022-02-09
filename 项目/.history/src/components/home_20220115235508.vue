<template>
  <div class="box">
    <div class="header">
      <div class="left">
        <span class="one">高校运动场地</span>
        <span class="two">预约系统</span>
      </div>
      <div class="right">
        <i class="iconfont">&#xe611;</i>
        <span><a href="#">登录</a></span>
        <span>&nbsp;</span>
        <span><a href="#">注册</a></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
* {
  text-decoration: none;
  list-style: none;
  margin: 0;
  padding: 0;
}
.header {
  height: 81px;
}
.header .left {
  float: left;
}
.header .left .one {
  font-size: 40px;
  font-weight: 1000;
  color: #3083eb;
  margin-left: 40px;
}
.header .left .two {
  font-size: 40px;
  font-weight: 1000;
  color: #cccccc;
}
.header i{
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: #dee1e6;
  font-size: 25px;
  line-height: 50px;
  float: right;
}
.header .right span{
  font-size: 20px;
  float: right;
}
.header .right span a{
  color: grey;
  font-weight: 500;
}
</style>