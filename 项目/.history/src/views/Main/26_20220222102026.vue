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
        prop="totalCount"
        align="center"
        width="100px"
      >
      </el-table-column>
      <el-table-column label="图片" prop="imgUrl" align="center">
        <template slot-scope="{ row, $index }">
          <img :src="row.imgUrl" alt="" style="width: 100px; height: 100px" />
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
      search: "",
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
      console.log(index, row);
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
      })
      .catch(() => {
        this.$message.error("错误");
      });
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
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    show() {
      this.dialogVisible = true;
      this.ruleForm = { userId: "", managerId: "" };
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