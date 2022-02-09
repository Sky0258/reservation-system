<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px"
      @click="dialogVisible = true">添加管理员</el-button
    >
    <el-dialog
      title="添加管理员信息"
      :visible.sync="dialogVisible"
      width="80px"
      :before-close="handleClose"
    >
     <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="管理员ID" prop="managerId">
    <el-input  v-model="ruleForm.managerId" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="用户ID" prop="userId">
    <el-input v-model="ruleForm.userId" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
  </el-form-item>
</el-form> 
    </el-dialog>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.username.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="序号" type="index" width="60px" align="center">
      </el-table-column>
      <el-table-column
        label="用户名"
        prop="username"
        align="center"
        width="80px"
      >
      </el-table-column>
      <el-table-column label="用户id" prop="userId" align="center">
      </el-table-column>
      <el-table-column label="电话号码" prop="mobileId" align="center">
      </el-table-column>
      <el-table-column label="学校" prop="college" align="center" width="120px">
      </el-table-column>
      <el-table-column
        label="班级"
        prop="className"
        align="center"
        width="120px"
      >
      </el-table-column>
      <el-table-column
        label="预约次数"
        prop="orderCount"
        width="90px"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="违约次数"
        prop="breakCount"
        width="90px"
        align="center"
      >
      </el-table-column>
      <el-table-column align="center">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="small" placeholder="搜索用户名" />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      tableData: [
        {
          userId: "",
          username: "",
          mobileId: "",
          className: "",
          college: "",
          orderCount: "",
          breakCount: "",
        },
      ],
      ruleForm: {
          userId:'',
          managerId:''
        },
      search: "",
      dialogVisible: false
    };
  },
  mounted() {
    this.$store.dispatch("managerInfo", {
      //   userId:this.userInfo.data.userId       （这里这样写就OK了）
      userId: 202041412124,
    });
    this.tableData = this.managerInfo.data;
  },
  methods: {
    handleDelete(index, row) {
      console.log(index, row);
    },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
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
  },
  computed: {
    ...mapGetters(["managerInfo"]),
  },
};
</script>

<style scoped>
</style>