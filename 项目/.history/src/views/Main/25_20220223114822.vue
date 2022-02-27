<template>
  <div>
    <el-select v-model="value" placeholder="请选择" @change="show">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="ID" prop="id" align="center" width="100px">
      </el-table-column>
      <el-table-column label="名称" prop="name" align="center">
      </el-table-column>
      <el-table-column label="图片" prop="imgUrl" align="center">
        <template slot-scope="{ row, $index }">
          <img :src="row.imgUrl" alt="" style="width: 85px; height: 85px" />
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
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
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
          label: "游泳馆",
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
      search: "",
      value: "0",
    };
  },
  mounted() {
    this.$store
      .dispatch("allSite", {
        userId: this.userInfo.data.userId,
        categoryId: "0",
      })
      .then(() => {
        this.tableData = this.allSite.data;
      })
      .catch(() => {
        this.$message.error("错误");
      });
  },
  methods: {
    getStatus(row, column, cellValue) {
      return Status[cellValue];
    },
    show(value) {
      this.$store
        .dispatch("allSite", {
          userId: this.userInfo.data.userId,
          categoryId: value,
        })
        .then(() => {
          this.tableData = this.allSite.data;
        })
        .catch(() => {
          this.$message.error("错误");
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
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
              this.$store
                .dispatch("allSite", {
                  userId: this.userInfo.data.userId,
                  categoryId: this.value,
                })
                .then(() => {
                  this.tableData = this.allSite.data;
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
  },
  computed: {
    ...mapGetters(["userInfo", "allSite"]),
  },
};
</script>

<style scoped>
.el-select-dropdown .el-popper {
    top: 107px;
}
</style>