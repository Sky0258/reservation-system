<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 0px 30px; float: left"
      @click="showAddRole"
      >添加新角色</el-button
    >
    <el-dialog
      title="添加角色"
      :visible.sync="dialogVisible1"
      width="32%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="新建角色名"
          prop="name"
          :rules="{
            required: true,
            message: '角色名不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >添加</el-button
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
      <el-table-column label="ID" prop="id" align="center" width="230px"> </el-table-column>
      <el-table-column label="角色名称" prop="name" align="center"> </el-table-column>
      <el-table-column align="center">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            icon="el-icon-delete-solid"
            >Delete</el-button
          >
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-s-tools"
            @click="showRights(scope.row)"
            >分配权限</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="权限设置"
      :visible.sync="dialogVisible"
      width="35%"
      :before-close="handleClose"
      @close="closeRights"
    >
      <el-tree
        :data="rightsList"
        :props="treeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys"
        ref="treeRef"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="choiceRights">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改角色"
      :visible.sync="dialogVisible2"
      width="32%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        hide-required-asterisk
      >
        <el-form-item label="角色名称" prop="name" :rules="{
            required: true,
            message: '角色名不能为空',
            trigger: 'blur',
          }">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm1('ruleForm')"
            >修改</el-button
          >
          <el-button @click="resetForm1('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisible3" width="30%">
      <span>删除该角色后，所拥有权限也将删除，是否确定删除？</span>
      <span slot="footer">
        <el-button @click="dialogVisible3 = false" style="margin-right: 5%"
          >取 消</el-button
        >
        <el-button type="primary" @click="deleteRole" style="margin-right: 25%"
          >确 定</el-button
        >
      </span>
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
  created() {
    this.getAllRoles();
  },
  data() {
    return {
      tableData: [
        {
          id: "",
          name: "",
        },  
      ],
      ruleForm: {
        id: "",
        name: "",
      },
      ruleFormk: {
        id: "",
        name: "",
      },
      row: "",
      search: "",
      dialogVisible1: false,
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      rightsList: [],
      treeProps: {
        label: "name",
        children: "children",
      },
      defKeys: [],
      currentPage: 1,
      totalPage: 1,
    };
  },
  methods: {
    getAllRoles() {
      let data = {
        pageNum: this.currentPage,
        pageSize: 6,
      };
      this.$store
        .dispatch("allRoles", {
          userId: this.userInfo.data.userId,
          data,
        })
        .then(() => {
          this.tableData = this.allRoles.data.list;
          this.totalPage = this.allRoles.data.total;
        })
        .catch(() => {
          this.$message.error("错误");
        });
    },
    handleEdit(index, row) {
      this.dialogVisible2 = true;
      this.ruleForm = {...row};
      this.ruleFormk = {...row};
    },
    handleDelete(index, row) {
      this.ruleForm.id = row.id;
      this.dialogVisible3 = true;
    },
    deleteRole() {
      this.$store
        .dispatch("deleteRole", {
          userId: this.userInfo.data.userId,
          roleId: this.ruleForm.id,
        })
        .then(() => {
          this.dialogVisible3 = false;
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getAllRoles();
        })
        .catch(() => {
          this.$message.error("删除失败！");
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    getLeafKeys(node, arr) {
      if (node.children.length == 0) {
        return arr.push(node.id);
      }
      node.children.forEach((item) => this.getLeafKeys(item, arr));
    },
    showRights(row) {
      this.row = row.id;
      this.$store
        .dispatch("allMenu")
        .then(() => {
          this.rightsList = this.allMenu.data.children;
          this.dialogVisible = true;
        })
        .catch(() => {
          this.$message.error("错误");
        });
      this.$store
        .dispatch("roleMenu", {
          roleIds: row.id,
        })
        .then(() => {
          this.defKeys = [];
          this.getLeafKeys(this.roleMenu.data, this.defKeys);
        })
        .catch(() => {});
    },
    closeRights() {
      this.defKeys = [];
    },
    choiceRights() {
      const keys = [
        1,
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ];
      var str = keys.join(",");
      this.$store
        .dispatch("giveRoleMenu", {
          menuIdList: str,
          roleId: this.row,
          userId: this.userInfo.data.userId,
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "授权成功!",
          });
          this.dialogVisible = false;
        })
        .catch(() => {
          this.$message.error("错误");
        });
    },
    showAddRole() {
      this.dialogVisible1 = true;
      this.ruleForm.name = "";
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("addRole", {
              userId: this.userInfo.data.userId,
              roleName: this.ruleForm.name,
            })
            .then(() => {
              this.dialogVisible1 = false;
              this.$message({
                type: "success",
                message: "添加成功!",
              });
              this.getAllRoles();
            })
            .catch(() => {
              this.$message.error("该角色名已存在！");
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    resetForm1(formName) {
      this.ruleForm = {...this.ruleFormk};
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      let data = {
        pageNum: val,
        pageSize: 6,
      };
      this.$store
        .dispatch("allRoles", {
          userId: this.userInfo.data.userId,
          data,
        })
        .then(() => {
          this.tableData = this.allRoles.data.list;
          this.totalPage = this.allRoles.data.total;
        })
        .catch(() => {
          this.$message.error("错误");
        });
    },
    submitForm1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("changeRole", {
              roleId: this.ruleForm.id,
              roleName: this.ruleForm.name,
            })
            .then(() => {
              this.dialogVisible2 = false;
              this.$message({
                type: "success",
                message: "修改成功!",
              });
              this.getAllRoles();
            })
            .catch(() => {
              this.$message.error("错误");
            });
        } else {
          return false;
        }
      });
    },
  },
  computed: {
    ...mapGetters(["userInfo", "allRoles", "allMenu", "roleMenu"]),
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
</style>