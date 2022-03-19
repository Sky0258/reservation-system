<template>
  <div>
    <h1 class="one">用户详细信息</h1>
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
      <!-- <el-table-column label="序号" type="index" width="70px" align="center"> -->
      <!-- </el-table-column> -->
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
      <el-table-column label="学校" prop="college" align="center">
      </el-table-column>
      <el-table-column label="班级" prop="className" align="center">
      </el-table-column>
      <el-table-column
        label="预约次数"
        prop="orderCount"
        width="120px"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="违约次数"
        prop="breakCount"
        width="120px"
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
          icon="el-icon-edit"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
      </template>

      </el-table-column>
    </el-table>
    <el-dialog
      title="用户信息"
      :visible.sync="dialogUserIfo"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm1"
        status-icon
        ref="ruleForm1"
        label-width="90px"
        label-position="left"
        class="demo-ruleForm"
        style="width: 90%; margin: 0 auto"
      >
        <el-form-item label="ID" prop="userId">
          <el-input v-model="ruleForm1.userId" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm1.username"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="mobileId">
          <el-input v-model.number="ruleForm1.mobileId"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="className">
          <el-input v-model.number="ruleForm1.className"></el-input>
        </el-form-item>
        <el-form-item label="学校" prop="college">
          <el-input v-model.number="ruleForm1.college"></el-input>
        </el-form-item>
        <el-form-item label="预约次数" prop="orderCount">
          <el-input v-model.number="ruleForm1.orderCount"></el-input>
        </el-form-item>
        <el-form-item label="违约次数" prop="breakCount">
          <el-input v-model.number="ruleForm1.breakCount"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm1('ruleForm1')"
            >修改信息</el-button
          >
          <el-button @click="resetForm('ruleForm1')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="6"
      layout="prev, pager, next, jumper"
      :total="totalPage"
      class="footer"
    >
    </el-pagination>
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
      ruleForm1: {
        userId: "",
        username: "",
        mobileId: "",
        className: "",
        college: "",
        orderCount: "",
        breakCount: "",
      },
      search: "",
      currentPage: 1,
      totalPage: 2,
      dialogUserIfo: false
    };
  },
  mounted() {
    this.getAllUserInfo();
  },
  methods: {
    getAllUserInfo() {
      let userId = this.userInfo.data.userId;
      let data = {
        pageNum: this.currentPage,
        pageSize: 6,
      };
      this.$store
        .dispatch("allUsersInfo", { userId, data })
        .then(() => {
          this.tableData = this.allUsersInfo.data.list;
          this.totalPage = this.allUsersInfo.data.total;
        })
        .catch(() => {
          this.$message.error("获取信息错误！");
        });
    },
    handleCurrentChange(val) {
      let userId = this.userInfo.data.userId;
      let data = {
        pageNum: val,
        pageSize: 6,
      };
      this.$store
        .dispatch("allUsersInfo", { userId, data })
        .then(() => {
          this.tableData = this.allUsersInfo.data.list;
          this.totalPage = this.allUsersInfo.data.total;
        })
        .catch(() => {
          this.$message.error("获取信息错误！");
        });
    },
    handleEdit(index,row){
      this.ruleForm1 = {...row};
      this.dialogUserIfo = true;
    },
    submitForm1(formName) {
      let userId = this.ruleForm1.userId;
      let data = this.ruleForm1;
      this.$store
        .dispatch("userChange", {
          userId,
          data,
        })
        .then(() => {
          this.dialogUserIfo = false;
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.getAllUserInfo();
        })
        .catch(() => {
          this.$message.error("错误");
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
  computed: {
    ...mapGetters(["userInfo", "allUsersInfo"]),
  },
};
</script>

<style scoped>
h1 {
  color: #409eff;
  margin-top: 3px;
  margin-bottom: 10px;
  font-size: 18px;
}
.footer {
  position: fixed;
  bottom: 0px;
  height: 40px;
  left: 100px;
  width: 100%;
  text-align: center;
}
</style>