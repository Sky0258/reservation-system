<template>
  <div class="box">
    <div class="contain">
      <router-link to="/register" class="link">没有账号，点击注册</router-link>
      <el-form
        :model="loginForm"
        ref="loginForm"
        label-width="60px"
        class="demo-ruleForm"
        label-position="left"
        hide-required-asterisk
        id="one"
      >
        <el-form-item
          label="账号"
          prop="id"
          :rules="{
            required: true,
            message: '账号不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="loginForm.id"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :rules="{
            required: true,
            message: '密码不能为空',
            trigger: 'blur',
          }"
        >
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item
          label="验证码"
          id="three"
          prop="checkNumber"
          :rules="{
            required: true,
            message: '验证码不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="loginForm.checkNumber"></el-input>
          <img :src="address" alt="" @click="check()" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click.prevent="submitForm('loginForm')"
            id="two"
            >登录</el-button
          >
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  data() {
    return {
      loginForm: {
        id: "",
        password: "",
        checkNumber: "",
      },
      note: {
        backgroundImage: "url(" + require("./images/背景4.jpg") + ") ",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      },
      address: "http://120.77.42.192:9090/account/captcha",
    };
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          try {
            this.$store.dispatch("userLogin", {
              captcha: this.loginForm.checkNumber,
              password: this.loginForm.password,
              userId: this.loginForm.id,
            });
            this.$message({
              message: "登录成功！",
              type: "success",
            });
            this.$router.push("/home");
            this.$store.dispatch("getUserInfo", {
              Authorization: this.token,
            });
            this.$store.dispatch("getUserInfo", {
              Authorization: this.token,
            });
          } catch (error) {
            alert("登录失败");
          }
        } else {
          console.log("error message!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    check() {
      this.address =
        "http://120.77.42.192:9090/account/captcha?time" + Date.now();
    },
  },
  computed:{
    ...mapGetters(['token'])
  }
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}
* {
  margin: 0 auto;
  padding: 0;
}
.box {
  background: url("./images/背景5.jpg");
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
  background-color: rgb(0, 0, 0, 0.4);
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
.el-input >>> .el-input__inner {
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
#three >>> .el-input {
  width: 140px;
  float: left;
}
img {
  width: 90px;
  height: 40px;
  border: 1px solid black;
  float: right;
}
</style>