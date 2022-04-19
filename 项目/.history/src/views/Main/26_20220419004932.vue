<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 4px 40px; float: left"
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
        label-width="70px"
        class="demo-ruleForm"
        style="width: 90%; margin-left: 10px"
        label-position="left"
        hide-required-asterisk
      >
        <el-form-item label="器材名称" prop="name" :rules="{
            required: true,
            message: '器材名称不能为空',
            trigger: 'blur',
          }">
          <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片地址" prop="imgUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/uploadImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            v-loading="loading"
            element-loading-text="加载中"
          >
            <img v-if="ruleForm.imgUrl" :src="ruleForm.imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div
              slot="tip"
              class="el-upload__tip"
              style="margin-top: -17px; margin-bottom: -10px"
            >
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="总数量" prop="totalCount" :rules="{
            required: true,
            message: '总数量不能为空',
            trigger: 'blur',
          }">
          <el-input v-model.number="ruleForm.totalCount"></el-input>
        </el-form-item>
        <el-form-item label="剩余数量" prop="currentCount" :rules="{
            required: true,
            message: '剩余数量不能为空',
            trigger: 'blur',
          }">
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
          <img :src="row.imgUrl" alt="" style="width: 81px; height: 81px" />
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
        hide-required-asterisk
      >
        <el-form-item label="器材名称" prop="name" :rules="{
            required: true,
            message: '器材名称不能为空',
            trigger: 'blur',
          }">
          <el-input v-model="ruleForm1.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片地址" prop="imgUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/uploadImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            v-loading="loading"
            element-loading-text="加载中"
          >
            <img
              v-if="ruleForm1.imgUrl"
              :src="ruleForm1.imgUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div
              slot="tip"
              class="el-upload__tip"
              style="margin-top: -17px; margin-bottom: -10px"
            >
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="总数量" prop="totalCount" :rules="{
            required: true,
            message: '总数量不能为空',
            trigger: 'blur',
          }">
          <el-input v-model="ruleForm1.totalCount"></el-input>
        </el-form-item>
        <el-form-item label="剩余数量" prop="currentCount" :rules="{
            required: true,
            message: '剩余数量不能为空',
            trigger: 'blur',
          }">
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
      :total="totalPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Loading } from "element-ui";
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
        id: "",
        name: "",
        imgUrl: "",
        currentCount: "",
        totalCount: "",
      },
      dialogVisible1: false,
      currentPage: 1,
      totalPage: 2,
      loading: false,
    };
  },
  mounted() {
    this.getEquipmentList();
  },
  methods: {
    getEquipmentList() {
      this.$store
        .dispatch("allEquipment", {
          pageNum: this.currentPage,
          pageSize: 3,
        })
        .then(() => {
          this.tableData = this.allEquipment.data.list;
          this.totalPage = this.allEquipment.data.total;
        })
        .catch(() => {
          this.$message.error("错误");
        });
    },
    handleEdit(index, row) {
      this.dialogVisible1 = true;
      this.ruleForm1 = { ...row };
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
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getEquipmentList();
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
      this.resetForm("ruleForm");
      this.ruleForm.imgUrl = "";
    },
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
              this.$message({
                type: "success",
                message: "添加成功!",
              });
              this.getEquipmentList();
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
            id: this.ruleForm1.id,
          };
          this.$store
            .dispatch("changeEquipment", { userId, data })
            .then(() => {
              this.$message({
                type: "success",
                message: "修改成功!",
              });
              this.getEquipmentList();
              this.dialogVisible1 = false;
            })
            .catch(() => {
              this.resetForm1("ruleForm1");
              this.$message.error("错误");
            });
        } else {
          this.$message.error("错误");
          return false;
        }
      });
    },
    resetForm1(formName) {
      this.$refs[formName].resetFields();
    },
    handleCurrentChange(val) {
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
    },
    handleAvatarSuccess(res, file) {
      this.ruleForm1.imgUrl = res.data[0];
      this.ruleForm.imgUrl = res.data[0];
      this.loading = false;
    },
    beforeAvatarUpload(file) {
      this.loading = true;
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 20px;
}
.footer {
  position: fixed;
  bottom: 0px;
  height: 40px;
  left: 100px;
  width: 100%;
  text-align: center;
}
.avatar-uploader >>> .el-upload {
  border: 1px dashed #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  /* float: left; */
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 200px;
  height: 150px;
  display: block;
}
</style>