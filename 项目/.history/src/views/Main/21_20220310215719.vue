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
      <el-table-column label="序号" type="index" width="70px" align="center">
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
      :current-page.sync="currentPage"
      :page-size="6"
      layout="prev, pager, next, jumper"
      :total="totalPage"
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
      currentPage: 1,
      totalPage: 2
    };
  },
  mounted() {
    let userId = this.userInfo.data.userId;
    let data = {
      pageNum: this.currentPage,
      pageSize: 6,
    };
    this.$store.dispatch("allUsersInfo", { userId, data }).then(() => {
      this.tableData = this.allUsersInfo.data.list;
      this.totalPage = this.allUsersInfo.data.total;
    }).catch(() => {
      this.$message.error("获取信息错误！");
    })
    
  },
  methods: {
    handleCurrentChange(val) {
      let userId = this.userInfo.data.userId;
      let data = {
        pageNum: val,
        pageSize: 6,
      };
      this.$store.dispatch("allUsersInfo", { userId, data })
      .then(() => {
        this.tableData = this.allUsersInfo.data.list;
      }).catch(() => {
        this.$message.error("获取信息错误！")
      })
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
  margin-top: 10px;
  margin-bottom: 10px;
}
.footer {
  position: fixed;
    bottom: 5px;
    height: 40px;
    left: 100px;
    width: 100%;
    text-align: center;
}
</style>