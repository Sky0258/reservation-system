<template>
  <div class="box">
    <div class="contain">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label="姓名" id="one" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="班级" id="one" prop="className">
          <el-input v-model="ruleForm.className"></el-input>
        </el-form-item>
        <el-form-item label="学号" id="one" prop="userId">
          <el-input v-model="ruleForm.userId"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" id="one" prop="mobileId">
          <el-input v-model="ruleForm.mobileId"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" id="three">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="true"
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
          <el-button type="primary" @click="submitForm()">注册</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <router-link to="/login" class="link">已有账号，点击登录</router-link>
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
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      if (value.length < 11) {
        callback(new Error("请输入11位电话号码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      labelPosition: "left",
      ruleForm: {
        className: " ",
        userId: "",
        username: "",
        password: "",
        checkPass: "",
        mobileId: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        mobileId: [{ validator: validatePass3, trigger: "blur" }],
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const { 'className':className,
          'userId':userId,
          'username':username,
          'password':password,
          'checkPass':checkPass,
          'mobileId':mobileId,
           } = this;
        this.$store.dispatch("userRegister", {
          'className':this.ruleForm.className,
          'userId':this.ruleForm.userId,
          'username':this.ruleForm.username,
          'password':this.ruleForm.password,
          'checkPass':this.ruleForm.checkPass,
          'mobileId':this.ruleForm.mobileId,
          });
        this.$message({
          message: '注册成功！',
          type: 'success'
        });
        this.$router.push("/home");
      } catch (error) {
        alert("注册失败!");
      }
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
.box{
  background: url('./images/背景7.jpg');
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%;
  min-width: 100%;
  min-height: 100%;
}
.contain {
  width: 420px;
  height: 500px;
  border: 1px solid #e0e0e0;
  text-align: center;
  padding-top: 25px;
  margin-top: 30px;
  background-color: rgb(0,0,0,0.6);
  border: 0;
}
#one >>> .el-form-item__label {
  font-size: 16px;
  color: white;
}
.el-form-item {
  margin-top: 20px;
  width: 320px;
}
/* #one .el-input {
  font-size: 16px;
} */
.el-input >>> .el-input__inner{
  background-color: #ecf5ff;
  color: black;
  font-size: 14px;
}
#three >>> .el-form-item__label {
  font-size: 16px;
  color: white;
}
#two .el-button {
  width: 78px;
  height: 43px;
  border-radius: 43px;
  font-size: 14px;
  margin-top: 11px;
}
.link {
  display: block;
  color: #409eff;
  text-decoration: none;
  margin-top: 20px;
  font-size: 16px;
  margin-left: 72px;
}
</style>