<template>
  <div class="contain">
    <el-form
      :model="loginForm"
      ref="numberValidateForm"
      label-width="80px"
      class="demo-ruleForm"
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
      >
        <el-input
          type="number"
          v-model.number="loginForm.password"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('numberValidateForm')"
          >提交</el-button
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
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
};
</script>

<style scoped>
.contain{
  width: 380px;
  height: 400px;
  border: 1px solid #e0e0e0;
}
</style>