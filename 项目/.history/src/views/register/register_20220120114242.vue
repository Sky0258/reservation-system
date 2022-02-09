<template>
  <div>
    <div class="contain">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
      >
        <el-form-item label="姓名" id="one">
          <el-input v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item label="学号" id="one">
          <el-input v-model="formLabelAlign.userId"></el-input>
        </el-form-item>
        <el-form-item label="班级" id="one">
          <el-input v-model="formLabelAlign.className"></el-input>
        </el-form-item>
        
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
          class="demo-ruleForm"
        >
        <el-form-item label="联系电话" id="one">
          <el-input v-model="formLabelAlign.mobileId" type="password"></el-input>
        </el-form-item>
          <el-form-item label="密码" prop="pass" id="three">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass" id="three">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item id="two">
            <el-button type="primary" @click="submitForm('ruleForm')"
              >注册</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      labelPosition: "left",
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
      },
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0 auto;
}
.contain {
  width: 500px;
  height: 1000px;
  border: 1px solid #e0e0e0;
  text-align: center;
}
#one >>> .el-form-item__label {
  font-size: 16px;
}
.el-form-item {
  margin-top: 20px;
  width: 320px;
}
#one .el-input {
  font-size: 16px;
}
#three >>> .el-form-item__label{
  font-size: 16px;
}
#two .el-button{
  width: 78px;
  height: 43px;
  border-radius: 43px;
  font-size: 14px;
  margin-top: 20px;
}
</style>