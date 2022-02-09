<template>
  <div class="box">
    <div class="header">
      <div class="left">
        <span class="one">高校运动场地</span>
        <span class="two">预约系统</span>
      </div>
      <div class="right">
        <span><a href="#" style="margin-right: 75px">注册</a></span>
        <span>&nbsp;</span>
        <span><a href="#">登录</a></span>
        <i class="iconfont">&#xe611;</i>
      </div>
    </div>
    <div class="nav">
      <ul>
        <li class="special"><a href="#">首页</a></li>
        <li><a href="#">场地预约</a></li>
        <li><a href="#">器材预约</a></li>
        <li><a href="#">公告栏</a></li>
      </ul>
    </div>
    <div class="slide">
      <div class="front">
        <img src="../assets/轮播1.jpg" alt="" />
      </div>
      <div class="back">
        <img src="../assets/轮播2.jpg" alt="" />
      </div>
    </div>
    <div class="btn">
      <button class="right"></button>
      <button class="left"></button>
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
  color: black;
}
.header {
  height: 81px;
  border-bottom: 1px solid #e0e0e0;
  margin-top: -32px;
}
.header .left {
  float: left;
}
.header .left .one {
  font-size: 35px;
  font-weight: 1000;
  color: #3083eb;
  margin-left: 40px;
}
.header .left .two {
  font-size: 35px;
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
  margin-right: 17px;
}
.header i:hover {
  color: #3083eb;
}
.header .right span {
  font-size: 18px;
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
  height: 50px;
  /* margin-bottom: 1px; */
}
.nav li {
  float: left;
  width: 156px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  margin-left: 20px;
}
.nav li a {
  font-size: 18px;
}
.nav li:hover {
  background-color: #3083eb;
}
.nav li:hover a {
  color: white;
}
.nav .special {
  margin-left: 40px;
  background-color: #3083eb;
}
.nav .special a {
  color: white;
}
.slide {
  position: relative;
  margin: 0 auto;
  height: 490px;
  width: 100%;
  transition: all 0.4s;
  transform-style: preserve-3d;
}
.slide:hover {
  transform: rotateY(180deg);
}
.slide img {
  width: 100%;
  height: 490px;
}
.front,
.back {
  width: 100%;
  height: 490px;
  position: absolute;
}
.back {
  transform: rotateY(180deg);
}
.btn button {
  width: 70px;
  height: 70px;
  border: 0px;
  background-color: #5f686e;
}
.btn .left{
  background: url(../assets/left.jpg);
}
.btn .right{
  background: url(../assets/right.jpg);
}
</style>