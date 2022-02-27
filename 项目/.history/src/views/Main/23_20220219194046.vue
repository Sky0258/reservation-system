<template>
  <div>
    <h1 class="one">场地订单</h1>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.username.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="订单ID" prop="id" width="90px" align="center">
      </el-table-column>
      <el-table-column label="用户ID" prop="userId" align="center">
      </el-table-column>
      <el-table-column
        label="用户名"
        prop="username"
        width="100px"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="场地名称"
        prop="siteName"
        width="100px"
        align="center"
      >
      </el-table-column>
      <el-table-column label="预约开始时间" prop="startedTime" align="center">
      </el-table-column>
      <el-table-column label="预约结束时间" prop="endedTime" align="center">
      </el-table-column>
      <el-table-column
        label="是否取消"
        prop="isDelete"
        width="100px"
        align="center"
        :formatter="getDelete"
      >
      </el-table-column>
      <el-table-column align="right" width="150px">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="small" placeholder="搜索用户名" />
        </template>
        <!-- <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template> -->
      </el-table-column>
    </el-table>
    <el-pagination
      class="footer"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="7"
      layout="prev, pager, next, jumper"
      :total="this.siteAllList.data.total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export const Delete = {'0':'是','1':'否'}
export default {
  data() {
    return {
      tableData: [
        {
          id: "",
          userId: "",
          username: "",
          siteName: "",
          startedTime: "",
          endedTime: "",
          isDelete: ""
        },
      ],
      search: '',
      currentPage: 1,
    };
  },
  mounted() {
    let userId = this.userInfo.data.userId;
    let data = {
      pageNum: 1,
      pageSize: 7,
    };
    this.$store
      .dispatch("siteAllList", { userId, data })
      .then(() => {
        this.tableData = this.siteAllList.data.list;
      })
      .catch(() => {
        this.$message.error("错误");
      });
  },
  methods: {
    handleCurrentChange(val) {
      let userId = this.userInfo.data.userId;
      let data = {
        pageNum: val,
        pageSize: 7,
      };
      this.$store
        .dispatch("siteAllList", { userId, data })
        .then(() => {
          this.tableData = this.siteAllList.data.list;
        })
        .catch(() => {
          this.$message.error("错误");
        });
    },
    getDelete(row,column,cellValue) {
      return Delete[cellValue]
    }
  },
  computed: {
    ...mapGetters(["userInfo", "siteAllList"]),
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