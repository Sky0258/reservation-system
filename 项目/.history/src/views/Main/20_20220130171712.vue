<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">修改信息</el-button>
    <el-dialog
      title="修改个人信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
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
    };
    return {
      ruleForm: {
        name: "123", //在这里直接写原始信息！！！！ token
        school: "456",
        className: "",
        mobileId: "",
      },
      labelPosition: "left",
      dialogVisible: false,
      rules: {
        mobileId: [{ validator: checkMobileId, trigger: "blur" }],
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
            this.$store.dispatch('userChange',{
              userId:"12",
              {
  breakCount: 0,
  className: "123",
  college: "12",
  mobileId: 0,
  orderCount: 0,
  username: "12"
              }
}
            });
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
  },
};
</script>

<style>
</style>