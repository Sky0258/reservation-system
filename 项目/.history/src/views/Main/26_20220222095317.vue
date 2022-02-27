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
      <el-table-column label="器材ID" prop="id"> </el-table-column>
      <el-table-column label="Name" prop="name"> </el-table-column>
      <el-table-column label="总数量" prop="totalCount"> </el-table-column>
      <el-table-column label="剩余数量" prop="totalCount"> </el-table-column>
      <el-table-column label="图片" prop="imgUrl">
        <template slot-scope="{row,$index}">
            <img :src="row.imgUrl" alt="" style="width:100px;height:100px">
        </template>
      </el-table-column>
      <el-table-column label="更新时间" prop="updateTime"> </el-table-column>
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
          name: "",
          totalCount: "",
          currentCount: "",
          imgUrl: "",
          updateTime:""
        },
      ],
      search: "",
    //   imgUrl1: this.allEquipment.data.imgUrl
    };
  },
  mounted() {
    this.$store
      .dispatch("allEquipment", {
          pageNum: 1,
          pageSize: 20
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