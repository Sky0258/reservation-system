<template>
  <div>
    <h1 class="one">公告栏列表</h1>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search || data.title.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="ID" prop="id" align="center" width="120px"> </el-table-column>
      <el-table-column label="标题" prop="title" align="center"> </el-table-column>
      <el-table-column label="发布者" prop="authorName" align="center" width="140px"> </el-table-column>
      <el-table-column label="创建时间" prop="createTime" align="center"> </el-table-column>
      <el-table-column align="center">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="small" placeholder="搜索标题关键字" />
        </template>
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-s-order" size="mini">详情</el-button>
          <el-button size="small" icon="el-icon-edit" type="primary" @click="handleEdit(scope.$index, scope.row)"
            ></el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
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
      search: "",
      currentPage: 1
    };
  },
  mounted() {
    this.$store
      .dispatch("allNotice", { 
        pageNum: 1,
        pageSize: 6
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
          pageSize: 6,
        })
        .then(() => {
          this.tableData = this.allNotice.data.list;
        })
        .catch(() => {
          this.$message.error("错误");
        });
    },
  },
  computed: {
    ...mapGetters(["userInfo", "allNotice"]),
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