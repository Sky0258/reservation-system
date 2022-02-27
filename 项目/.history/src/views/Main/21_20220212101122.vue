<template>
  <div>
    <h1 class="one">用户详细信息</h1>
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
      <el-table-column label="序号" type="index" width="60px" align="center">
      </el-table-column>
      <el-table-column
        label="用户名"
        prop="username"
        align="center"
        width="80px"
      >
      </el-table-column>
      <el-table-column label="用户id" prop="userId" align="center">
      </el-table-column>
      <el-table-column label="电话号码" prop="mobileId" align="center">
      </el-table-column>
      <el-table-column label="学校" prop="college" align="center" width="120px">
      </el-table-column>
      <el-table-column
        label="班级"
        prop="className"
        align="center"
        width="120px"
      >
      </el-table-column>
      <el-table-column
        label="预约次数"
        prop="orderCount"
        width="90px"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="违约次数"
        prop="breakCount"
        width="90px"
        align="center"
      >
      </el-table-column>
      <el-table-column align="center">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="small" placeholder="搜索用户名" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage3"
      :page-size="5"
      layout="prev, pager, next, jumper"
      :total="30"
      class="footer"
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
          userId: "",
          username: "",
          mobileId: "",
          className: "",
          college: "",
          orderCount: "",
          breakCount: "",
        },
      ],
      search: "",
      currentPage3: '',
    };
  },
  mounted() {
    let userId = 202041412124;
    let data = {
      pageNum: this.currentPage3,
      pageSize: 5,
    };
    this.$store.dispatch("allUsersInfo", { userId, data });
    this.tableData = this.allUsersInfo.data;
  },
  methods: {
    handleCurrentChange() {
      let userId = 202041412124;
      let data = {
        pageNum: this.currentPage3,
        pageSize: 5,
      };
      this.$store.dispatch("allUsersInfo", { userId, data });
      this.tableData = this.allUsersInfo.data;
    },
  },
  computed: {
    ...mapGetters(["userInfo", "allUsersInfo"]),
  },
};
</script>

<style scoped>
h1 {
  color: #409eff;
}
.footer {
  margin-top: 50px;
}
</style>