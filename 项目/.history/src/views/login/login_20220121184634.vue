<template>
<div class="box">
  <div class="contain">
    <router-link to="/register" class="link">没有账号，点击注册</router-link>
    <el-form :model="loginForm" ref="loginForm" label-width="50px" class="demo-ruleForm" id="one">
  <el-form-item
    label="账号"
    prop="userId"
  >
    <el-input type="id" v-model.number="loginForm.userId" autocomplete="off"></el-input>
  </el-form-item>
    <el-form-item
    label="密码"
    prop="password"
  >
    <el-input type="password" v-model.number="loginForm.password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click.prevent="submitForm('loginForm')" id="two">登录</el-button>
    <el-button @click="resetForm('loginForm')">重置</el-button>
  </el-form-item>
</el-form>
  </div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
    data() {
      return {
        loginForm: {
          userId:'',
          password:''
        }
      };
    },    
    methods: {
      async submitForm(formName) {
      try {
        const { userId, password } = this;
        userId &&
          password &&
          (await this.$store.dispatch("userLogin", {
            'userId': this.loginForm.userId,
            'password': this.loginForm.password,
          }));
        this.$router.push("/home");
      } catch (error) {
        alert(error.message);
      }
      },
      // axios.post("/account/login",{'userId': this.loginForm.userId,'password': this.loginForm.password,}).then(res=>{
      //   console.log(res)
      // }).catch(err => {
      //   console.log(err)
      // })
    //   axios({
    //     url:'/account/login',
    //     method:'post',
    //     params:{
    //       'id': formName.userId,
    //       'password': formName.password
    //     }
    //   }).catch(res => {

    //   }).catch(err =>{

    //   })
    // },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
* {
  margin: 0 auto;
  padding: 0;
}
/* .box{
  background: url(./images/背景6.jpg);
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%;
  min-width: 100%;
  min-height: 100%;
} */
.contain {
  width: 300px;
  height: 175px;
  border: 1px solid #e0e0e0;
  padding: 50px;
}
#one {
  margin-top: 20px;
}
#one >>> .el-form-item {
  margin-bottom: 20px;
}
#one >>> .el-input {
  font-size: 14px;
}
#one >>> .el-form-item__label {
  font-size: 16px;
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
  color: #66b1ff;
  text-decoration: none;
  margin-top: -25px;
  font-size: 16px;
  margin-left: 72px;
  float: right;
}
</style>