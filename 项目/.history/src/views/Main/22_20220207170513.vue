<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px"
      >添加管理员</el-button
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
      <el-table-column label="序号" type="index" width="60px" align="center">
      </el-table-column>
      <el-table-column label="用户名" prop="username" align="center" width="80px"> </el-table-column>
      <el-table-column label="用户id" prop="userId" align="center"> </el-table-column>
      <el-table-column label="电话号码" prop="mobileId" align="center"> </el-table-column>
      <el-table-column label="学校" prop="college" align="center" width="120px"> </el-table-column>
      <el-table-column label="班级" prop="className" align="center" width="120px"> </el-table-column>
      <el-table-column label="预约次数" prop="orderCount" width="90px" align="center">
      </el-table-column>
      <el-table-column label="违约次数" prop="breakCount" width="90px" align="center">
      </el-table-column>
      <el-table-column align="left">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="small" placeholder="搜索" />
        </template>
        <template slot-scope="scope">
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
          userId: "",
          username: "",
          mobileId: "",
          className: "",
          college: "",
          orderCount: "",
          breakCount: ""
        },
      ],
      search: "",
    };
  },
  mounted() {
    this.$store.dispatch("managerInfo", {
      //   userId:this.userInfo.data.userId       （这里这样写就OK了）
      userId: 202041412124,
    });
    this.tableData = this.managerInfo.data;
  },
  methods: {
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
  computed: {
    ...mapGetters(["managerInfo"]),
  },
};
</script>

<style scoped>
</style>