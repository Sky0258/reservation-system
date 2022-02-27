<template>
  <div>
    <h1 class="one">公告栏列表</h1>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 15px 40px; float: left"
      @click="dialogVisible = true"
      >添加公告</el-button
    >
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
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
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
      title="修改器材信息"
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
      >
        <el-form-item label="器材名称" prop="name">
          <el-input v-model="ruleForm1.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片地址" prop="imgUrl">
          <el-input v-model="ruleForm1.imgUrl"></el-input>
        </el-form-item>
        <el-form-item label="总数量" prop="totalCount">
          <el-input v-model="ruleForm1.totalCount"></el-input>
        </el-form-item>
        <el-form-item label="剩余数量" prop="currentCount">
          <el-input v-model="ruleForm1.currentCount"></el-input>
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
      :page-size="3"
      layout="prev, pager, next, jumper"
      :total="this.allNotice.data.total"
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
      dialogVisible: false,
      search: "",
      currentPage: 1,
    };
  },
  mounted() {
    this.$store
      .dispatch("allNotice", {
        pageNum: 1,
        pageSize: 5,
      })
      .then(() => {
        this.tableData = this.allNotice.data.list;
      })
      .catch(() => {
        this.$message.error("错误");
      });
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
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
        })
        .catch(() => {
          this.$message.error("错误");
        });
    },
    showNotice(row) {
      this.$alert(row.content, row.title, {
        confirmButtonText: "确定",
        callback: (action) => {
          this.$message({
            type: "info",
            message: `action: ${action}`,
          });
        },
      });
    },
    handleClose(done) {
      this.$confirm("是否确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
      this.resetForm1("ruleForm1");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
              this.$store
                .dispatch("allNotice", {
                  pageNum: this.currentPage,
                  pageSize: 5,
                })
                .then(() => {
                  this.tableData = this.allNotice.data.list;
                })
                .catch(() => {
                  this.$message.error("错误");
                });
            })
            .catch(() => {
              this.$message.error("错误");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      this.dialogVisible = false;
    },
    submitForm1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let userId = this.userInfo.data.userId;
          let data = {
            currentCount: this.ruleForm1.currentCount,
            imgUrl: this.ruleForm1.imgUrl,
            name: this.ruleForm1.name,
            totalCount: this.ruleForm1.totalCount,
            userId: this.userInfo.data.userId,
            id: this.ruleForm1.id
          };
          console.log(data);
          this.$store
            .dispatch("changeEquipment", { userId, data })
            .then(() => {
                this.$message({
                    type: "success",
                    message: "修改成功!",
                  });
              this.$store
                .dispatch("allEquipment", {
                  pageNum: this.currentPage,
                  pageSize: 3,
                })
                .then(() => {
                  this.tableData = this.allEquipment.data.list;
                })
                .catch(() => {
                  this.$message.error("错误");
                });
            })
            .catch(() => {
              this.resetForm1('ruleForm1');
              this.$message.error("错误");
            });
        } else {
          this.$message.error("错误");
          return false;
        }
      });
      this.dialogVisible1 = false;
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