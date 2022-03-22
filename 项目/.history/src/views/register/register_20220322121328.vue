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
        hide-required-asterisk
      >
        <el-form-item
          label="姓名"
          id="one"
          prop="username"
          :rules="{
            required: true,
            message: '请输入姓名',
            trigger: 'blur',
          }"
        >
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
        <el-form-item
          label="学号"
          id="one"
          prop="userId"
          :rules="[
            { required: true, message: '请输入学号' },
            { type: 'number', message: '学号必须为数字值' },
          ]"
        >
          <el-input v-model.number="ruleForm.userId"></el-input>
        </el-form-item>
        </el-tooltip>
        <el-form-item
          label="班级"
          id="one"
          prop="className"
          :rules="{
            required: true,
            message: '请输入班级',
            trigger: 'blur',
          }"
        >
          <el-input v-model="ruleForm.className"></el-input>
        </el-form-item>
        <el-form-item
          label="学院"
          id="one"
          prop="college"
          :rules="{
            required: true,
            message: '请输入学院',
            trigger: 'blur',
          }"
        >
          <el-input v-model="ruleForm.college"></el-input>
        </el-form-item>
        <el-form-item
          label="联系电话"
          id="one"
          prop="mobileId"
        >
          <el-input v-model="ruleForm.mobileId"></el-input>
        </el-form-item>
        
    <el-tooltip class="item" effect="dark"  placement="right">
   <div slot="content">密码长度应为6-18位，以字母开头<br/>且只包含数字、字母、下划线</div>
        <el-form-item label="密码" prop="password" id="three">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="true"
            maxlength="18"
          ></el-input>
        </el-form-item>
         </el-tooltip>
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
      <router-link to="/login" class="link">已有账号，点击登录</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      var reg1 = /^[a-zA-Z][0-9a-zA-Z_]{5,17}$/g; 
      if (value === "") {
        callback(new Error("请输入密码"));
      }else if(!reg1.test(value)) {
        callback(new Error("密码格式错误"));
      }
      else {
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
      var reg1 = /^1[0-9]{10}$/g; 
      if (!reg1.test(value)) {
        callback(new Error("请输入11位有效电话号码"));
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
        className: "",
        userId: "",
        username: "",
        password: "",
        checkPass: "",
        mobileId: "",
        college: "",
      },
      rules: {
        password: [
          { required: true, validator: validatePass, trigger: "blur"},
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        mobileId: [
          { required: true, validator: validatePass3, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          try {
            this.$store.dispatch("userRegister", {
              className: this.ruleForm.className,
              userId: this.ruleForm.userId,
              username: this.ruleForm.username,
              password: this.ruleForm.password,
              checkPass: this.ruleForm.checkPass,
              mobileId: this.ruleForm.mobileId,
              college: this.ruleForm.college,
            });
            this.$message({
              message: "注册成功！",
              type: "success",
            });
            this.$router.push("/home");
          } catch (error) {
            alert("注册失败!");
          }
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
.box {
  background: url("./images/背景7.jpg");
  background-attachment: fixed;
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%;
  min-width: 100%;
  min-height: 100%;
}
.contain {
  width: 420px;
  height: 530px;
  border: 1px solid #e0e0e0;
  text-align: center;
  padding-top: 8px;
  margin-top: 30px;
  background-color: rgb(0, 0, 0, 0.6);
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
.el-input >>> .el-input__inner {
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
  margin-top: 0px;
}
.link {
  display: block;
  color: #409eff;
  text-decoration: none;
  margin-top: 10px;
  font-size: 16px;
  margin-left: 72px;
}
</style>