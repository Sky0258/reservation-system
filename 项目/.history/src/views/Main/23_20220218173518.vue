<template>
  <div>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="订单ID" prop="id" width="90px" align="center"> </el-table-column>
      <el-table-column label="用户ID" prop="userId" align="center"> </el-table-column>
      <el-table-column label="用户名" prop="username" width="100px" align="center"> </el-table-column>
      <el-table-column label="场地名称" prop="siteName" width="100px" align="center"> </el-table-column>
      <el-table-column label="预约开始时间" prop="startedTime" align="center">
      </el-table-column>
      <el-table-column label="预约结束时间" prop="endedTime" align="center"> </el-table-column>
      <el-table-column label="是否取消" prop="isDelete" width="100px" align="center"> </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
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
          siteName: "",
          startedTime: "",
          endedTime: "",
          isDelete: "",
        },
      ],
      search: "",
    };
  },
  mounted(){
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
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
  computed: {
    ...mapGetters(["userInfo", "siteAllList"]),
  },
};
</script>

<style>
</style>