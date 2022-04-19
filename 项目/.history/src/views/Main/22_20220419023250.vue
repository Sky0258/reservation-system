<template>
  <div>
    <h1 class="one">管理员信息</h1>
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
      <el-table-column
        label="用户名"
        prop="username"
        align="center"
        width="140px"
      >
      </el-table-column>
      <el-table-column
        label="用户id"
        prop="userId"
        align="center"
        width="140px"
      >
      </el-table-column>
      <el-table-column label="电话号码" prop="mobileId" align="center">
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
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
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
      title="管理员信息"
      :visible.sync="dialogVisible1"
      width="35%"
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
        hide-required-asterisk
      >
        <el-form-item label="ID" prop="userId">
          <el-input v-model="ruleForm1.userId" disabled></el-input>
        </el-form-item>
        <el-form-item
          label="用户名"
          prop="username"
          :rules="{
            required: true,
            message: '用户名不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="ruleForm1.username"></el-input>
        </el-form-item>
        <el-form-item
          label="电话号码"
          prop="mobileId"
          :rules="{
            required: true,
            message: '电话号码不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model.number="ruleForm1.mobileId"></el-input>
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
          <el-input v-model.number="ruleForm1.className"></el-input>
        </el-form-item>
        <el-form-item
          label="学院"
          prop="college"
          :rules="{
            required: true,
            message: '学院不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model.number="ruleForm1.college"></el-input>
        </el-form-item>
        <el-form-item
          label="预约次数"
          prop="orderCount"
          :rules="{
            required: true,
            message: '预约次数不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model.number="ruleForm1.orderCount"></el-input>
        </el-form-item>
        <el-form-item
          label="违约次数"
          prop="breakCount"
          :rules="{
            required: true,
            message: '违约次数不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model.number="ruleForm1.breakCount"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm1('ruleForm1')"
            >修改信息</el-button
          >
          <el-button @click="resetForm1('ruleForm1')">重置</el-button>
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
      class="footer"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="6"
      layout="prev, pager, next, jumper"
      :total="totalPage"
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
      ruleFormk: {
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
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      currentPage: 1,
      totalPage: 2,
      value: "",
    };
  },
  mounted() {
    this.getManagerInfo();
    this.getAllRoleList();
  },
  methods: {
    getManagerInfo() {
      let data = {
        pageNum: this.currentPage,
        pageSize: 6,
      };
      this.$store
        .dispatch("managerInfo", {
          userId: this.userInfo.data.userId,
          data,
        })
        .then(() => {
          this.tableData = this.managerInfo.data.list;
          this.totalPage = this.managerInfo.data.total;
        })
        .catch(() => {
          this.$message.error("错误");
        });
    },
    handleEdit(index, row) {
      this.dialogVisible1 = true;
      this.ruleForm1 = { ...row };
      this.ruleFormk = { ...row };
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    resetForm1(formName) {
      this.ruleForm1 = { ...this.ruleFormk };
    },
    handleCurrentChange(val) {
      let data = {
        pageNum: val,
        pageSize: 6,
      };
      this.$store
        .dispatch("managerInfo", {
          userId: this.userInfo.data.userId,
          data,
        })
        .then(() => {
          this.tableData = this.managerInfo.data.list;
          this.totalPage = this.managerInfo.data.total;
        })
        .catch(() => {
          this.$message.error("错误");
        });
    },
    // submitForm1(formName) {
    //   let userId = this.ruleForm1.userId;
    //   let data = this.ruleForm1;
    //   this.$store
    //     .dispatch("userChange", {
    //       userId,
    //       data,
    //     })
    //     .then(() => {
    //       this.$message({
    //         type: "success",
    //         message: "修改成功!",
    //       });
    //       this.getManagerInfo();
    //       this.dialogVisible1 = false;
    //     })
    //     .catch(() => {
    //       this.$message.error("错误");
    //     });
    // },
    submitForm1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let userId = this.ruleForm1.userId;
          let data = this.ruleForm1;
          this.$store
            .dispatch("userChange", {
              userId,
              data,
            })
            .then(() => {
              this.$message({
                type: "success",
                message: "修改成功!",
              });
              this.getManagerInfo();
              this.dialogVisible1 = false;
            })
            .catch(() => {
              this.$message.error("错误");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
  },
  computed: {
    ...mapGetters(["userInfo", "managerInfo", "role", "allRoles"]),
  },
};
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 5px;
  height: 40px;
  left: 100px;
  width: 100%;
  text-align: center;
}
h1 {
  color: #409eff;
  margin-top: 4px;
  font-size: 18px;
}
</style>