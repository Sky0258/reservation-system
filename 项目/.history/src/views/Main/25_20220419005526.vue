<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 8px 40px; float: left"
      @click="show1"
      >添加场地</el-button
    >
    <el-dialog
      title="添加场地"
      :visible.sync="dialogVisible"
      width="31%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="68px"
        class="demo-ruleForm"
        style="width:85%;margin-left: 20px"
        label-position="left"
        hide-required-asterisk
      >
        <el-form-item label="场地名称" prop="name" :rules="{
            required: true,
            message: '场地名称不能为空',
            trigger: 'blur',
          }">
          <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="场地图片" prop="imgUrl" :rules="{
            required: true,
            message: '场地图片不能为空',
            trigger: 'blur',
          }">
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
            <div slot="tip" class="el-upload__tip" style="margin-top:-17px;margin-bottom:-10px">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="场地状态" prop="status" :rules="{
            required: true,
            message: '场地状态不能为空',
            trigger: 'blur',
          }">
          <el-input v-model.number="ruleForm.status" placeholder="0为开放，1为维修"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-select
      v-model="value"
      placeholder="请选择"
      @change="show"
      style="margin: 10px 30px; float: right"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="ID" prop="id" align="center" width="100px">
      </el-table-column>
      <el-table-column label="名称" prop="name" align="center">
      </el-table-column>
      <el-table-column label="图片" prop="imgUrl" align="center">
        <template slot-scope="{ row, $index }">
          <img :src="row.imgUrl" alt="" style="width: 120px; height: 79px" />
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        prop="status"
        :formatter="getStatus"
        align="center"
      >
      </el-table-column>
      <el-table-column label="更新时间" prop="updateTime" align="center">
      </el-table-column>
      <el-table-column align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
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
        <el-form-item label="场地名称" prop="name" :rules="{
            required: true,
            message: '场地名称不能为空',
            trigger: 'blur',
          }">
          <el-input v-model="ruleForm1.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片地址" prop="imgUrl" >
          <el-upload
            class="avatar-uploader"
            action="/api/uploadImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            v-loading="loading"
            element-loading-text="加载中"
          >
            <img v-if="ruleForm1.imgUrl" :src="ruleForm1.imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip" style="margin-top:-17px;margin-bottom:-10px">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible3">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-input v-model="ruleForm1.status" placeholder="0为开放,1为维修"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm1('ruleForm1')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm1')">重置</el-button>
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
export const Status = { 0: "开放", 1: "维修" };
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      options: [
        {
          value: "0",
          label: "篮球场",
        },
        {
          value: "1",
          label: "羽毛球场",
        },
        {
          value: "2",
          label: "乒乓球场",
        },
        {
          value: "3",
          label: "网球场",
        },
        {
          value: "4",
          label: "匹克球场",
        },
        {
          value: "5",
          label: "足球场",
        },
      ],
      tableData: [
        {
          id: "",
          name: "",
          imgUrl: "",
          status: "",
          updateTime: "",
        },
      ],
      ruleForm: {
        name: "",
        imgUrl: "",
        status: "",
      },
      ruleForm1: {
        id: "",
        name: "",
        imgUrl: "",
        status: "",
      },
      search: "",
      value: "0",
      dialogVisible: false,
      dialogVisible1: false,
      currentPage: 1,
      dialogImageUrl: "",
      dialogVisible3: false,
      disabled: false,
      totalPage: 2,
      loading: false
    };
  },
  mounted() {
    this.getSiteList();
  },
  methods: {
    getSiteList(){
      let data = {
      pageNum: this.currentPage,
      pageSize: 3,
    };
    let userId = this.userInfo.data.userId;
    let categoryId = this.value;
    this.$store
      .dispatch("allSite", {
        userId,
        categoryId,
        data,
      })
      .then(() => {
        this.tableData = this.allSite.data.list;
        this.totalPage = this.allSite.data.total;
      })
      .catch(() => {
        this.$message.error("错误");
      });
    },
    getStatus(row, column, cellValue) {
      return Status[cellValue];
    },
    show(value) {
      this.getSiteList();
    },
    handleEdit(index, row) {
      this.dialogVisible1 = true;
      this.ruleForm1 = {...row};
      this.resetForm("ruleForm1");
    },
    handleDelete(index, row) {
      this.$confirm("此操作将删除该场地信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store
            .dispatch("deleteSite", {
              userId: this.userInfo.data.userId,
              siteId: row.id,
            })
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getSiteList();
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
            id: 1,
            imgUrl: this.ruleForm.imgUrl,
            name: this.ruleForm.name,
            status: this.ruleForm.status,
            userId: this.userInfo.data.userId,
          };
          this.$store
            .dispatch("addSite", { userId, data })
            .then(() => {
              this.$message({
                type: "success",
                message: "添加成功!",
              });
              this.getSiteList();
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
            imgUrl: this.ruleForm1.imgUrl,
            name: this.ruleForm1.name,
            status: this.ruleForm1.status,
            userId: this.userInfo.data.userId,
            id: this.ruleForm1.id,
          };
          //   console.log(data);
          this.$store
            .dispatch("changeSite", { userId, data })
            .then(() => {
              this.$message({
                type: "success",
                message: "修改成功!",
              });
              this.getSiteList();
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
    handleCurrentChange(val) {
      let data = {
        pageNum: val,
        pageSize: 3,
      };
      this.$store
        .dispatch("allSite", {
          userId: this.userInfo.data.userId,
          categoryId: this.value,
          data,
        })
        .then(() => {
          this.tableData = this.allSite.data.list;
        })
        .catch(() => {
          this.$message.error("错误");
        });
    },
    show1() {
      this.dialogVisible = true;
      this.resetForm('ruleForm');
      this.ruleForm.imgUrl = "";
    },
    handleAvatarSuccess(res, file) {
      this.loading = false;
      this.ruleForm1.imgUrl = res.data[0];
      this.ruleForm.imgUrl = res.data[0];
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
    ...mapGetters(["userInfo", "allSite"]),
  },
};
</script>

<style scoped>
.el-select-dropdown {
  top: 107px;
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