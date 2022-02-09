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
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="60px"
        class="demo-ruleForm"
        :label-position="left"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="className">
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
        <el-button type="primary" @click="dialogVisible = false"
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
      if (value.length < 11) {
        return callback(new Error("请输入11位有效号码"));
      }
    };
    return {
      ruleForm: {
        name: "",
        school: "",
        className: "",
        mobileId: "",
      },

      rules: {
        mobileId: [{ validator: checkMobileId, trigger: "blur" }],
      },
      dialogVisible: false,
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
</style>