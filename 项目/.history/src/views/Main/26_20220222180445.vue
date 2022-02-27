<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 15px 40px; float: left"
      @click="show"
      >添加器材</el-button
    >
    <h1 class="one">器材列表</h1>
    <el-dialog
      title="添加器材"
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
        <el-form-item label="器材名称" prop="name">
          <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片地址" prop="imgUrl">
          <el-input v-model.number="ruleForm.imgUrl"></el-input>
        </el-form-item>
        <el-form-item label="总数量" prop="totalCount">
          <el-input v-model.number="ruleForm.totalCount"></el-input>
        </el-form-item>
        <el-form-item label="剩余数量" prop="currentCount">
          <el-input v-model.number="ruleForm.currentCount"></el-input>
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
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="ID" prop="id" width="90px" align="center">
      </el-table-column>
      <el-table-column label="Name" prop="name" align="center">
      </el-table-column>
      <el-table-column
        label="总数量"
        prop="totalCount"
        align="center"
        width="100px"
      >
      </el-table-column>
      <el-table-column
        label="剩余数量"
        prop="currentCount"
        align="center"
        width="100px"
      >
      </el-table-column>
      <el-table-column label="图片" prop="imgUrl" align="center">
        <template slot-scope="{ row, $index }">
          <img :src="row.imgUrl" alt="" style="width: 85px; height: 85px" />
        </template>
      </el-table-column>
      <el-table-column label="更新时间" prop="updateTime" align="center">
      </el-table-column>
      <el-table-column align="center">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="small"
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
          name: "",
          totalCount: "",
          currentCount: "",
          imgUrl: "",
          updateTime: "",
        },
      ],
      ruleForm: {
        name: "",
        imgUrl: "",
        currentCount: "",
        totalCount: "",
      },
      search: "",
      dialogVisible: false,
      ruleForm1: {
        id:"",
        name: "",
        imgUrl: "",
        currentCount: "",
        totalCount: "",
      },
      dialogVisible1: false,
    };
  },
  mounted() {
    this.$store
      .dispatch("allEquipment", {
        pageNum: 1,
        pageSize: 20,
      })
      .then(() => {
        this.tableData = this.allEquipment.data.list;
      })
      .catch(() => {
        this.$message.error("错误");
      });
  },
  methods: {
    handleEdit(index, row) {
      this.dialogVisible1 = true;
      this.ruleForm1 = row;
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将删除该器材信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store
            .dispatch("deleteEquipment", {
              userId: this.userInfo.data.userId,
              equipmentId: row.id,
            })
            .then(() => {
              this.$store
                .dispatch("allEquipment", {
                  pageNum: 1,
                  pageSize: 20,
                })
                .then(() => {
                  this.tableData = this.allEquipment.data.list;
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
    show() {
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm("是否确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
        this.resetForm1('ruleForm1');
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let userId = this.userInfo.data.userId;
          let data = {
            currentCount: this.ruleForm.currentCount,
            imgUrl: this.ruleForm.imgUrl,
            name: this.ruleForm.name,
            totalCount: this.ruleForm.totalCount,
          };
          this.$store
            .dispatch("addEquipment", { userId, data })
            .then(() => {
              this.$store
                .dispatch("allEquipment", {
                  pageNum: 1,
                  pageSize: 20,
                })
                .then(() => {
                  this.tableData = this.allEquipment.data.list;
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
              this.$store
                .dispatch("allEquipment", {
                  pageNum: 1,
                  pageSize: 20,
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
    resetForm1(formName) {
      this.$refs[formName].resetFields();
    },
  },
  computed: {
    ...mapGetters(["userInfo", "allEquipment"]),
  },
};
</script>

<style scoped>
h1 {
  color: #409eff;
  float: left;
  margin-left: 300px;
}
</style>