<template>
  <div class="box">
    <div class="header"> 
      <button @click="check">点击我</button>
      <div class="left">
        <span class="one">高校运动场地</span>
        <span class="two">预约系统</span>
      </div>
      <div class="right">
        <span><router-link to="/register" style="margin-right: 75px">注册</router-link></span>
        <span>&nbsp;</span>
        <span><router-link to="/login">登录</router-link></span>
        <i class="iconfont">&#xe611;</i>
      </div>
    </div>
    <div class="nav">
      <ul>
        <li class="special"><a href="#">首页</a></li>
        <li><a href="#s1">场馆预约</a></li>
        <li><a href="#s2">器材预约</a></li>
        <li><a href="#">公告栏</a></li>
      </ul>
    </div>
    <div class="slide" :style="message" @mouseover="stop" @mouseout="start">
      <div class="front">
        <img src="./images/轮播1.jpg" alt="" />
      </div>
      <div class="back">
        <img src="./images/轮播2.jpg" alt="" />
      </div>
    </div>
    <div class="btn" @mouseover="stop" @mouseout="start">
      <button class="right" @click="next"></button>
      <button class="left" @click="next"></button>
    </div>
    <div class="banner" id="s1">
      <div>场馆预约</div>
      <div>- VENUE -</div>
      <ul>
        <li><a href="#">篮球场</a></li>
        <li><a href="#">网球场</a></li>
        <li><a href="#">羽毛球场</a></li>
        <li><a href="#">匹克球场</a></li>
        <li><a href="#">乒乓球场</a></li>
        <li><a href="#">游泳馆</a></li>
      </ul>
    </div>
    <div class="list">
      <ul class="left">
        <li class="special">场地预约</li>
        <li><a href="#">篮球场</a></li>
        <li><a href="#">网球场</a></li>
        <li><a href="#">羽毛球场</a></li>
        <li><a href="#">匹克球场</a></li>
        <li><a href="#">乒乓球场</a></li>
        <li><a href="#">游泳馆</a></li>
      </ul>
      <div class="right">
        <div>
          <img src="./images/乒乓球场.jpg" alt="" /><br /><span>乒乓球场</span>
        </div>
        <div>
          <img src="./images/羽毛球场.jpg" alt="" /><br /><span>羽毛球场</span>
        </div>
        <div>
          <img src="./images/篮球场.jpg" alt="" /><br /><span>篮球场</span>
        </div>
        <div>
          <img src="./images/网球场.jpg" alt="" /><br /><span>网球场</span>
        </div>
        <div>
          <img src="./images/匹克球场.jpg" alt="" /><br /><span>匹克球场</span>
        </div>
        <div>
          <img src="./images/游泳馆.jpg" alt="" /><br /><span>游泳馆</span>
        </div>
      </div>
    </div>
    <div class="banner" id="s2">
      <div>器材预约</div>
      <div>- EQUIPMENT -</div>
      <ul>
        <li><a href="#">篮球</a></li>
        <li><a href="#">网球 / 拍</a></li>
        <li><a href="#">羽毛球 / 拍</a></li>
        <li><a href="#">匹克球 / 拍</a></li>
        <li><a href="#">乒乓球 / 拍</a></li>
      </ul>
    </div>
    <div class="list" id="list1">
      <ul class="left">
        <li class="special">器材预约</li>
        <li><a href="#">篮球</a></li>
        <li><a href="#">网球 / 拍</a></li>
        <li><a href="#">羽毛球 / 拍</a></li>
        <li><a href="#">匹克球 / 拍</a></li>
        <li><a href="#">乒乓球 / 拍</a></li>
      </ul>
      <div class="right">
        <div>
          <img src="./images/篮球.jpg" alt="" /><br /><span>篮球</span>
        </div>
        <div>
          <img src="./images/羽毛球.jpg" alt="" /><br /><span
            >羽毛球 / 拍</span
          >
        </div>

        <div>
          <img src="./images/乒乓球.jpg" alt="" /><br /><span
            >乒乓球 / 拍</span
          >
        </div>
        <div>
          <img src="./images/网球.jpg" alt="" /><br /><span>网球 / 拍</span>
        </div>
        <div>
          <img src="./images/匹克球.jpg" alt="" /><br /><span
            >匹克球 / 拍</span
          >
        </div>
      </div>
    </div>
    <div class="footer">
      <ul>
        <li>首页</li>
        <li>相关咨询</li>
        <li>公告栏</li>
        <li>制作者信息</li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  data() {
    return {
      message: " ",
    };
  },
  mounted(){
    //token获取用户信息
    if(this.token){
    this.$store.dispatch('getUserInfo',{
      Authorization:this.token
    });
    console.log( '@3333333' + this.token);
  }
  },
  methods: {
    next() {
      if (this.message == " ") {
        this.message = "transform: rotateY(180deg);";
      } else {
        this.message = " ";
      }
    },
    stop() {
      clearInterval(this.timer);
    },
    start() {
      this.timer = setInterval(() => {
        this.next();
      }, 10000);
    },
    check(){
      console.log('025' + this.token);
      this.$store.dispatch('getUserInfo',{
      Authorization:this.token
    });
    }
  },
  created() {
    this.timer = setInterval(() => {
      this.next();
    }, 10000);
  },
  computed:{
    ...mapGetters(['token'])
  }
};
</script>

<style scoped>
* {
  text-decoration: none;
  list-style: none;
  margin: 0;
  padding: 0;
  color: black;
  text-align: center;
}
.box {
  min-width: 1260px;
}
.header {
  height: 81px;
  border-bottom: 1px solid #e0e0e0;
  margin-top: 32px;
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
  color: #5f6368;
}
.header i:hover {
  color: #3083eb;
}
.header .right span {
  font-size: 18px;
  float: right;
  margin-top: 13px;
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
  transition: all 0.8s ease-out 0s;
  transform-style: preserve-3d;
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
.btn {
  position: relative;
}
.btn button {
  width: 70px;
  height: 70px;
  border: 0px;
  position: absolute;
  top: -267px;
}
.btn .left {
  background: url(./images/left.jpg) center no-repeat;
  background-color: rgba(0, 0, 0, 0.1);
  left: 15px;
}
.btn .right {
  background: url(./images/right.jpg) center no-repeat;
  background-color: rgba(0, 0, 0, 0.1);
  right: 15px;
}
.banner {
  height: 150px;
  background-color: #434343;
  padding-top: 30px;
}
.banner div {
  color: white;
  font-size: 19px;
}
.banner li {
  float: left;
  margin: 40px 45px 0 100px;
}
.banner li a {
  color: #999999;
}
.list {
  height: 610px;
  font-family: "宋体";
  font-weight: 500;
}
.list .left {
  width: 240px;
  height: 515px;
  background-color: #f6f6f6;
  margin: 45px 0 0 24px;
  float: left;
}
.list .left li {
  font-size: 20px;
  width: 205px;
  height: 70px;
  line-height: 70px;
  margin-left: 10px;
  border-bottom: 1px dashed black;
  font-size: 16px;
  text-align: left;
  padding-left: 10px;
}
.list .left li a:hover {
  color: #3083eb;
}
.list .left .special {
  width: 220px;
  height: 70px;
  font-size: 18px;
  background-color: #3083eb;
  color: white;
  line-height: 70px;
  border: 0;
  margin-left: 0;
  padding-left: 20px;
}
.list .left .special a:hover {
  color: white;
}
.list .right {
  float: right;
  width: 953px;
  margin-top: 45px;
  margin-right: 25px;
}
.list .right div {
  float: right;
  width: 300px;
  height: 251px;
  background-color: #f6f6f6;
  margin-right: 15px;
  margin-bottom: 15px;
}
.list .right div img {
  width: 262px;
  height: 183px;
  margin-left: 3px;
  margin-top: 15px;
}
.list .right div span {
  display: block;
  margin-top: 8px;
}
#list1 .left {
  float: right;
  margin-right: 37px;
  margin-left: 0;
}
#list1 .left li {
  height: 80px;
  line-height: 80px;
}
#list1 .right {
  float: left;
  margin-left: 25px;
  width: 945px;
  margin-right: 0;
}
#list1 .right div {
  float: left;
}
#s2 li {
  margin-left: 120px;
}
.footer {
  margin-top: 20px;
  height: 150px;
  background-color: #2b2b2b;
  border-top: 3px solid #3083eb;
}
.footer li {
  float: left;
  font-size: 18px;
  color: #3083eb;
  margin-top: 60px;
  margin-left: 180px;
}
</style>