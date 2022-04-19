<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: -5px 40px; float: left"
      @click="showAddNotice"
      >添加公告</el-button
    >
    <h1 class="one" style="margin: 15px 200px">公告栏列表</h1>
    <el-dialog
      title="添加公告"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
        hide-required-asterisk
      >
        <el-form-item label="标题" prop="title" :rules="{
            required: true,
            message: '标题不能为空',
            trigger: 'blur',
          }">
          <el-input v-model="ruleForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content" :rules="{
            required: true,
            message: '内容不能为空',
            trigger: 'blur',
          }">
          <el-input v-model.number="ruleForm.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search || data.title.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="ID" prop="id" align="center" width="120px">
      </el-table-column>
      <el-table-column label="标题" prop="title" align="center">
      </el-table-column>
      <el-table-column
        label="发布者"
        prop="authorName"
        align="center"
        width="140px"
      >
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" align="center">
      </el-table-column>
      <el-table-column align="center">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="small"
            placeholder="搜索标题关键字"
          />
        </template>
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-s-order"
            size="small"
            @click="showNotice(scope.row)"
            >详情</el-button
          >
          <el-button
            size="small"
            icon="el-icon-edit"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
          ></el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="修改公告信息"
      :visible.sync="dialogVisible1"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm1"
        status-icon
        ref="ruleForm1"
        label-width="80px"
        class="demo-ruleForm"
        hide-required-asterisk
      >
        <el-form-item label="标题" prop="title" :rules="{
            required: true,
            message: '标题不能为空',
            trigger: 'blur',
          }">
          <el-input v-model="ruleForm1.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content" :rules="{
            required: true,
            message: '内容不能为空',
            trigger: 'blur',
          }">
          <el-input v-model="ruleForm1.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm1('ruleForm1')"
            >提交</el-button
          >
          <el-button @click="resetForm1('ruleForm1')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-pagination
      class="footer"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="5"
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
          id: "",
          title: "",
          createTime: "",
          authorName: "",
        },
      ],
      ruleForm: {
        title: "",
        content: "",
      },
      ruleForm1: {
        id: "",
        title: "",
        content: "",
      },
      ruleFormk: {
        id: "",
        title: "",
        content: "",
      },
      dialogVisible: false,
      search: "",
      currentPage: 1,
      dialogVisible1: false,
      totalPage: 1,
    };
  },
  mounted() {
    this.getNoticeList();
  },
  methods: {
    getNoticeList() {
      this.$store
        .dispatch("allNotice", {
          pageNum: this.currentPage,
          pageSize: 5,
        })
        .then(() => {
          this.tableData = this.allNotice.data.list;
          this.totalPage = this.allNotice.data.total;
        })
        .catch(() => {
          this.$message.error("错误");
        });
    },
    showAddNotice() {
      this.dialogVisible = true;
      this.ruleForm.title = "";
      this.ruleForm.content = "";
    },
    handleEdit(index, row) {
      this.ruleFormk = {...row};
      this.ruleForm1 = {...row};
      this.dialogVisible1 = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleCurrentChange(val) {
      this.$store
        .dispatch("allNotice", {
          pageNum: val,
          pageSize: 5,
        })
        .then(() => {
          this.tableData = this.allNotice.data.list;
          this.totalPage = this.allNotice.data.total;
        })
        .catch(() => {
          this.$message.error("错误");
        });
    },
    showNotice(row) {
      this.$alert(row.content, row.title, {
        confirmButtonText: "确定",
        // callback: (action) => {
        //   this.$message({
        //     type: "info",
        //     message: `action: ${action}`,
        //   });
        // },
      });
    },
    handleClose(done) {
      this.$confirm("是否确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
      // this.resetForm("ruleForm1");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    resetForm1(formName) {
      console.log(this.ruleFormk);
      this.ruleForm1 = {...this.ruleFormk};
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let userId = this.userInfo.data.userId;
          let data = {
            title: this.ruleForm.title,
            content: this.ruleForm.content,
            authorId: userId,
          };
          this.$store
            .dispatch("addNotice", { userId, data })
            .then(() => {
              this.$message({
                type: "success",
                message: "添加成功!",
              });
              this.getNoticeList();
              this.dialogVisible = false;
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
    submitForm1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let userId = this.userInfo.data.userId;
          let data = {
            id: this.ruleForm1.id,
            authorId: this.userInfo.data.userId,
            content: this.ruleForm1.content,
            title: this.ruleForm1.title,
          };
          console.log(data);
          this.$store
            .dispatch("changeNotice", { userId, data })
            .then(() => {
              this.$message({
                type: "success",
                message: "修改成功!",
              });
              this.getNoticeList();
              this.dialogVisible1 = false;
            })
            .catch(() => {
              // this.resetForm1("ruleForm1");
              this.$message.error("错误");
            });
        } else {
          this.$message.error("错误");
          return false;
        }
      });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将删除该公告, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store
            .dispatch("deleteNotice", {
              notificationId: row.id,
            })
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getNoticeList();
            })
            .catch(() => {
              this.$message.error("错误");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  computed: {
    ...mapGetters(["userInfo", "allNotice", "notice"]),
  },
};
</script>

<style scoped>
h1 {
  color: #409eff;
  margin-top: -10px;
  margin-bottom: 5px;
  font-size: 20px;
}
.footer {
  position: fixed;
  bottom: 10px;
  height: 40px;
  left: 100px;
  width: 100%;
  text-align: center;
}
</style>