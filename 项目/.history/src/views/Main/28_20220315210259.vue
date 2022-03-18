<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: -5px 30px; float: left"
      @click="show"
      >添加新角色</el-button
    >
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="ID" prop="id"> </el-table-column>
      <el-table-column label="角色名称" prop="name"> </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" 
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
          <el-button type="warning" size="mini" icon="el-icon-s-tools" @click="showRights()">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
  title="权限设置"
  :visible.sync="dialogVisible"
  width="40%"
  :before-close="handleClose">
  <el-tree :data="rightsList" :props="treeProps" show-checkbox node-key="id" default-expand-all :default-checked-keys="defKeys"></el-tree>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
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
      search: "",
      dialogVisible: false,
      rightsList: [],
      treeProps:{
        label:'name',
        children:'children'
      },
      defKeys:[]
    };
  },
  methods: {
    getAllRoles() {
      this.$store
        .dispatch("allRoles",this.userInfo.data.userId)
        .then(() => {
          this.tableData = this.allRoles.data;
        })
        .catch(() => {
          this.$message.error("错误");
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    showRights(){
        this.dialogVisible = true;
        this.$store
        .dispatch("allMenu")
        .then(() => {
          this.rightsList = this.allMenu.data.children;
          console.log(this.rightsList);
        })
        .catch(() => {
          this.$message.error("错误");
        });
    }
  },
  computed: {
    ...mapGetters(["userInfo", "allRoles","allMenu"]),
  },
};
</script>

<style>
</style>