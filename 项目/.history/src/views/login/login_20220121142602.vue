<template>
  <div class="contain">
    <router-link to="/register" class="link">没有账号，点击注册</router-link>
    <el-form
      :model="loginForm"
      ref="numberValidateForm"
      label-width="60px"
      class="demo-ruleForm"
      id="one"
    >
      <el-form-item
        label="账号"
        prop="age"
      >
        <el-input
          type="id"
          v-model.number="loginForm.age"
          autocomplete="off"
          placeholder="请输入学号 / 手机号"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
        id="one"
      >
        <el-input
          type="id"
          v-model.number="loginForm.password"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('numberValidateForm')" id="two"
          >登录</el-button
        >
        <el-button @click="resetForm('numberValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
      return {
        loginForm: {
          age: '',
          password:''
        }
      };
    },
    methods: {
      submitForm(formName) {
        
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
};
</script>

<style scoped>
*{
  margin: 0 auto;
}
.contain{
  width: 300px;
  height: 175px;
  border: 1px solid #e0e0e0;
  padding: 50px;
}
#one{
  margin-top: 20px;
}
#one >>> .el-form-item{
  margin-bottom: 20px;
}
#one >>> .el-input {
  font-size: 14px; 
}
#one >>> .el-form-item__label {
  font-size: 16px;
}
#one >>> .el-button{
  margin-top: 10px;
  width: 78px;
  height: 43px;
  border-radius: 43px;
  font-size: 14px;
}
#two{
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