<template>
  <div>
    <el-form
      :model="numberValidateForm"
      ref="numberValidateForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="账号"
        prop="age"
        aria-placeholder="请输入学号/手机号"
      >
        <el-input
          type="age"
          v-model.number="numberValidateForm.age"
          autocomplete="off"
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
        numberValidateForm: {
          age: ''
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

<style>
</style>