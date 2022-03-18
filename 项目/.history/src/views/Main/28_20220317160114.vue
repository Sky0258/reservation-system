<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: -5px 30px; float: left"
      
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
          <el-button type="warning" size="mini" icon="el-icon-s-tools" @click="showRights(scope.row)">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
  title="权限设置"
  :visible.sync="dialogVisible"
  width="35%"
  :before-close="handleClose"
  @close="closeRights">
  <el-tree :data="rightsList" :props="treeProps" show-checkbox node-key="id" default-expand-all :default-checked-keys="defKeys" ref="treeRef"></el-tree>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="choiceRights">确 定</el-button>
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
      row:"",
      search: "",
      dialogVisible: false,
      rightsList: [],
      treeProps:{
        label:'name',
        children:'children'
      },
      defKeys:[],
      arr:[1,2,9]
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
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    getLeafKeys(node,arr){
      if(node.children.length == 0){
          return arr.push(node.id);
      }
      node.children.forEach(item => this.getLeafKeys(item, arr));
    },
    showRights(row){
        this.row = row.id;
        this.$store
        .dispatch("allMenu")
        .then(() => {
          this.rightsList = this.allMenu.data.children;
        })
        .catch(() => {
          this.$message.error("错误");
        });
        this.$store
        .dispatch("roleMenu",{
            roleIds: row.id
        })
        .then(() => {
            this.defKeys = [];
            this.getLeafKeys(this.roleMenu.data,this.defKeys);
            this.dialogVisible = true;
        })
        .catch(() => {
          this.$message.error("错误");
        });
        
    },
    closeRights(){
        this.defKeys = [];
    },
    choiceRights(){
      this.dialogVisible = false;
      const keys = [1,...this.$refs.treeRef.getCheckedKeys(),...this.$refs.treeRef.getHalfCheckedKeys()];
      var str = keys.join(",");
      console.log(k);
      this.$store
        .dispatch("giveRoleMenu",{
            menuIdList: str,
            roleId: this.row,
            userId: this.userInfo.data.userId
        })
        .then(() => {
            this.defKeys = [];
            this.getLeafKeys(this.roleMenu.data,this.defKeys);
            this.dialogVisible = true;
        })
        .catch(() => {
          this.$message.error("错误");
        });
    }
  },
  computed: {
    ...mapGetters(["userInfo", "allRoles","allMenu","roleMenu"]),
  },
};
</script>

<style>
</style>