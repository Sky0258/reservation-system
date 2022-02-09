<template>
  <div class="box">
    <div class="header">
      <div class="left">
        <span class="one">高校运动场地</span>
        <span class="two">预约系统</span>
      </div>
      <div class="right">
        <span><a href="#" style="margin-right: 112px">注册</a></span>
        <span>&nbsp;</span>
        <span><a href="#">登录</a></span>
        <i class="iconfont">&#xe611;</i>
      </div>
    </div>
    <div class="nav">
      <ul>
        <li><a href="#">首页</a></li>
        <li><a href="#">场地预约</a></li>
        <li><a href="#">器材预约</a></li>
        <li><a href="#">公告栏</a></li>
      </ul>
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
.header i {
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: #dee1e6;
  font-size: 25px;
  line-height: 50px;
  float: right;
  margin-right: 20px;
}
.header i:hover {
  color: #3083eb;
}
.header .right span {
  font-size: 20px;
  float: right;
  margin-top: 10px;
}
.header .right span a {
  color: grey;
  font-weight: 500;
}
.header .right span a:hover {
  color: #3083eb;
}
.nav {
  height: 100px;
}
.nav li{
  float: left;
  width: 190px;
  height: 50px;
  background-color: #3083eb;
  text-align: center;
}
</style>