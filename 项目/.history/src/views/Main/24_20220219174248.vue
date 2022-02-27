<template>
  <div>
    <h1 class="one">器材订单</h1>
    <el-table
      :data="tableData.filter((data) => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="订单ID" prop="id" width="80px" align="center">
      </el-table-column>
      <el-table-column label="用户ID" prop="userId" align="center" width="130px">
      </el-table-column>
      <el-table-column
        label="用户名"
        prop="username"
        width="100px"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="器材名称"
        prop="equipmentName"
        width="100px"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="数量"
        prop="count"
        width="80px"
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
        width="80px"
        align="center"
      >
      </el-table-column>
      <el-table-column align="right" width="150px">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="small" placeholder="搜索用户名" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="footer"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="6"
      layout="prev, pager, next, jumper"
      :total="this.equipmentAllList.data.total"
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
          userId: "",
          username: "",
          equipmentName: "",
          count:"",
          startedTime: "",
          endedTime: "",
          isDelete: "",
        },
      ],
      search: "",
      currentPage: 1,
    };
  },
  mounted() {
    let userId = this.userInfo.data.userId;
    let data = {
      pageNum: 1,
      pageSize: 6,
    };
    this.$store
      .dispatch("equipmentAllList", { userId, data })
      .then(() => {
        this.tableData = this.equipmentAllList.data.list;
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
        pageSize: 6,
      };
      this.$store
        .dispatch("equipmentAllList", { userId, data })
        .then(() => {
          this.tableData = this.equipmentAllList.data.list;
        })
        .catch(() => {
          this.$message.error("错误");
        });
    },
  },
  computed: {
    ...mapGetters(["userInfo", "equipmentAllList"]),
  },
}
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