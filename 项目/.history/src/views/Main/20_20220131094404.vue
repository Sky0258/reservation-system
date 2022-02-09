<template>
  <div>
    <div class="button">
      <el-button type="primary" @click="showInfo">修改信息</el-button>
      <el-dialog
        title="修改个人信息"
        :visible.sync="infoDialogVisible"
        width="30%"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="60px"
          class="demo-ruleForm"
          :label-position="labelPosition"
          hide-required-asterisk
        >
          <el-form-item
            label="用户名"
            prop="name"
            :rules="{
              required: true,
              message: '用户名不能为空',
              trigger: 'blur',
            }"
          >
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item
            label="班级"
            prop="className"
            :rules="{
              required: true,
              message: '班级不能为空',
              trigger: 'blur',
            }"
          >
            <el-input v-model="ruleForm.className"></el-input>
          </el-form-item>
          <el-form-item label="学校" prop="school">
            <el-input v-model="ruleForm.school"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobileId">
            <el-input v-model.number="ruleForm.mobileId"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确 定</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </span>
      </el-dialog>

      <el-button type="primary" @click="showPassword">修改密码</el-button>

      <el-dialog title="修改密码" :visible.sync="passwordDialogVisible" width="30%">
        <el-form
          :model="ruleForm"
          status-icon
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
        <el-form-item label="原始密码" prop="oldPass">
            <el-input v-model.number="ruleForm.oldPass"></el-input>
          </el-form-item>
          <el-form-item label="新设密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
            
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="passwordDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="passwordDialogVisible = false"
            >确 定</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var checkMobileId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        if (value.length < 11) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 1000);
       var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    };
    return {
      ruleForm: {
        name: "123", //在这里直接写原始信息！！！！ token
        school: "456",
        className: "",
        mobileId: "",
        oldPass:"",
        Pass:"",
        checkPass:""
      },
      labelPosition: "left",
      infoDialogVisible: false,
      passwordDialogVisible: false,
      rules: {
        mobileId: [{ validator: checkMobileId, trigger: "blur" }],
        pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
        checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
      },
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("是否确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          try {
            let userId = "12";
            let data = {
              breakCount: 1111,
              className: "123",
              college: "12",
              mobileId: 111,
              orderCount: 111,
              username: "12",
            };
            this.$store.dispatch("userChange", { userId, data });
            this.dialogVisible = false;
          } catch (error) {
            alert("修改失败！");
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
    showInfo() {
      this.infoDialogVisible = true;
    },
    showPassword() {
      this.passwordDialogVisible = true;
    },
  },
};
</script>

<style>
</style>