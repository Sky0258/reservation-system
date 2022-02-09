<template>
<div class="box">
  <div class="contain">
    <router-link to="/register" class="link">没有账号，点击注册</router-link>
    <el-form :model="loginForm" ref="loginForm" label-width="60px" class="demo-ruleForm" id="one">
  <el-form-item
    label="账号"
    prop="id"
  >
    <el-input type="id" v-model.number="loginForm.id" autocomplete="off"></el-input>
  </el-form-item>
    <el-form-item
    label="密码"
    prop="password"
  >
    <el-input type="password" v-model.number="loginForm.password" autocomplete="off"></el-input>
  </el-form-item>
    <el-form-item
    label="验证码"
    prop="checkNumber"
  >
    <el-input type="id" v-model.number="loginForm.checkNumber" autocomplete="off"></el-input>
    <!-- <img src="/verifyCode" alt=""> -->
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click.prevent="submitForm('loginForm')" id="two">登录</el-button>
    <el-button @click="resetForm('loginForm')">重置</el-button>
  </el-form-item>
</el-form>

<!-- <img src="http://120.77.42.192:9090/account/captcha" alt=""> -->

<!-- <button @click="check()">点击我</button> -->
  </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        loginForm: {
          id:"",
          password:"",
          checkNumber:"",
        },
        note: {
          backgroundImage: "url(" + require("./images/背景4.jpg") + ") ",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        },
      };
    },    
    methods: {
      async submitForm(formName) {
      try {
        const { 'id': id,'password':password } = this;
           await this.$store.dispatch("userLogin", {
            'id': this.loginForm.id,
            'password':this.loginForm.password
          });
        this.$router.push("/home");
      } catch (error) {
        alert(error.message);
      }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      check(){
        const{id } = this;
        this.$store.dispatch("userLoginCheck",{});
      }
    }
  }
</script>

<style scoped>
body{
   margin: 0;
  padding: 0;
}
* {
  margin: 0 auto;
  padding: 0;
}
.box{
  background: url('./images/背景5.jpg');
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%;
  min-width: 100%;
  min-height: 100%;
}
.contain {
  width: 300px;
  height: 221px;
  border: 1px solid #e0e0e0;
  padding: 50px;
  margin-top: 80px;
  background-color: rgb(0,0,0,0.4);
  border: 0;
}
#one {
  margin-top: 20px;
}
#one >>> .el-form-item {
  margin-bottom: 20px;
}
#one >>> .el-input {
  font-size: 14px;
  color: white;
}
.el-input >>> .el-input__inner{
  background-color: #ecf5ff;
  color: black;
  font-size: 14px;
}
#one >>> .el-form-item__label {
  font-size: 16px;
  color: white;
}
#one >>> .el-button {
  margin-top: 10px;
  width: 78px;
  height: 43px;
  border-radius: 43px;
  font-size: 14px;
}
#two {
  margin-left: -46px;
}
.link {
  display: block;
  color: #409eff;
  text-decoration: none;
  margin-top: -25px;
  font-size: 16px;
  margin-left: 72px;
  float: right;
}
img{
  width: 100px;
  height: 50px;
  border: 1px solid black;
}
</style>