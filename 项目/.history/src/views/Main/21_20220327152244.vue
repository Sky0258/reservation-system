<template>
  <div>
    <el-button type="primary" style="margin: 20px" @click="exportExcel"
      >导出Excel</el-button
    >
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
        width="120px"
      >
      </el-table-column>
      <el-table-column label="用户id" prop="userId" align="center">
      </el-table-column>
      <el-table-column label="电话号码" prop="mobileId" align="center">
      </el-table-column>
      <!-- <el-table-column label="学院" prop="college" align="center">
      </el-table-column>
      <el-table-column label="班级" prop="className" align="center">
      </el-table-column> -->
      <el-table-column
        label="预约次数"
        prop="orderCount"
        width="130px"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="违约次数"
        prop="breakCount"
        width="130px"
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
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-s-tools"
            @click="handleChoice(scope.$index, scope.row)"
            >分配角色</el-button
          >
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
        <el-form-item label="学院" prop="college">
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
    <el-dialog
      title="分配角色"
      :visible.sync="dialogVisible2"
      width="30%"
      :before-close="handleClose"
    >
      <el-descriptions :column="1">
        <el-descriptions-item label="ID">{{
          this.ruleForm1.userId
        }}</el-descriptions-item>
        <el-descriptions-item label="用户名">{{
          this.ruleForm1.username
        }}</el-descriptions-item>
        <el-descriptions-item label="用户角色">{{
          this.roleName
        }}</el-descriptions-item>
        <el-descriptions-item label="分配新角色">
          <el-select v-model="value" placeholder="请选择" size="mini">
            <el-option
              v-for="item in this.allRoles.data.list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-descriptions-item>
      </el-descriptions>
      <el-button type="primary" @click="giveRole" style="margin-top: 20px"
        >修改角色</el-button
      >
      <el-button @click="dialogVisible2 = false" style="margin-top: 20px"
        >取消</el-button
      >
    </el-dialog>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="totalPage"
      class="footer"
    >
    </el-pagination>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
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
      roleName: "",
      search: "",
      currentPage: 1,
      totalPage: 2,
      dialogVisible2: false,
      dialogUserIfo: false,
      value: "",
      pageSize:6
    };
  },
  mounted() {
    this.getAllUserInfo();
    this.getAllRoleList();
  },
  methods: {
    getAllUserInfo() {
      let userId = this.userInfo.data.userId;
      let data = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      };
      this.$store
        .dispatch("allUsersInfo", { userId, data })
        .then(() => {
          this.tableData = this.allUsersInfo.data.list;
          this.tableData1 = this.allUsersInfo.data.list;
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
    handleChoice(index, row) {
      this.ruleForm1 = { ...row };
      var arr = [];
      this.$store
        .dispatch("userRole", row.userId)
        .then(() => {
          for (let index in this.role) {
            arr.push(this.role[index].name);
          }
          var str = arr.join(",");
          this.roleName = str;
        })
        .catch(() => {
          this.$message.error("错误");
        });
      this.dialogVisible2 = true;
    },
    getAllRoleList() {
      let data = {
        pageNum: 1,
        pageSize: 100,
      };
      this.$store
        .dispatch("allRoles", {
          userId: this.userInfo.data.userId,
          data,
        })
        .then(() => {})
        .catch(() => {
          this.$message.error("错误");
        });
    },
    giveRole() {
      this.$store
        .dispatch("giveRole", {
          manageId: this.userInfo.data.userId,
          userId: this.ruleForm1.userId,
          roleId: this.value,
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "添加角色成功!",
          });
          this.dialogVisible2 = false;
          this.value = "";
        })
        .catch(() => {
          this.$message.error("错误");
        });
    },
     exportExcel() {
       let k = this.currentPage;
      this.currentPage = 1;
      this.pageSize = 100;
      this.getAllUserInfo();
       let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let name = year + "" + month + "" + day;
      // console.log(name)
      /* generate workbook object from table */
      //  .table要导出的是哪一个表格
      var wb = XLSX.utils.table_to_book(document.querySelector('div'));
      console.log();
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        //  name+'.xlsx'表示导出的excel表格名字
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          name + ".xlsx"
        );
        // this.currentPage = k;
        // this.pageSize = 6;
        // this.getAllUserInfo();
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      // this.pageSize = 6;
      // this.getAllUserInfo();
      return wbout;
    },
  },
  computed: {
    ...mapGetters(["userInfo", "allUsersInfo","role", "allRoles"]),
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