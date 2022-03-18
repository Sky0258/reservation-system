<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: -5px 30px; float: left"
      @click="show"
      >添加管理员</el-button
    >
    <h1 class="one" style="margin: 15px 200px">管理员信息</h1>
    <el-dialog
      title="添加管理员信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      class="one"
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item
          label="管理员ID"
          prop="managerId"
          :rules="{
            required: true,
            message: '管理员ID不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="ruleForm.managerId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="用户ID"
          prop="userId"
          :rules="{
            required: true,
            message: '用户ID不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="ruleForm.userId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确 定</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
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
      <!-- <el-table-column label="序号" type="index" width="60px" align="center">
      </el-table-column> -->
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
      <!-- <el-table-column label="学校" prop="college" align="center" width="120px">
      </el-table-column>
      <el-table-column
        label="班级"
        prop="className"
        align="center"
        width="120px"
      >
      </el-table-column> -->
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
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
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
        style="width:90%;margin: 0 auto"
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
          <el-button type="primary" @click="submitForm1('ruleForm')"
            >修改</el-button
          >
          <el-button @click="resetForm('ruleForm1')">重置</el-button>
        </el-form-item>
      </el-form>
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
      ruleForm: {
        userId: "",
        managerId: "",
      },
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
      dialogVisible: false,
      dialogVisible1: false,
      currentPage: 1,
      totalPage: 2,
    };
  },
  mounted() {
    let data = {
      pageNum: 1,
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
  methods: {
    handleDelete(index, row) {
      this.$confirm("此操作将删除该管理员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store
            .dispatch("deleteManager", {
              administratorId: this.userInfo.data.userId,
              userId: row.userId,
            })
            .then(() => {
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
                  this.$message({
                    type: "success",
                    message: "删除成功!",
                  });
                })
                .catch(() => {
                  this.$message.error("错误");
                });
            })
            .catch(() => {
              alert("删除失败！");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleEdit(index, row){
      console.log(row);
      this.dialogVisible1 = true;
      this.ruleForm1 = row;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    show() {
      this.dialogVisible = true;
      this.ruleForm = { userId: "", managerId: "" };
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("createManager", {
              administratorId: this.ruleForm.managerId,
              userId: this.ruleForm.userId,
            })
            .then(() => {
              this.dialogVisible = false;
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
              this.$message({
                message: "添加成功！",
                type: "success",
              });
            })
            .catch(() => {
              alert("添加失败");
            });
        } else {
          this.$message.error("提交错误！");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
  },
  computed: {
    ...mapGetters(["userInfo", "managerInfo"]),
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
  margin-top: -10px;
  margin-bottom: 5px;
}
</style>