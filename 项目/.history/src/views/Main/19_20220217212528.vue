<template>
  <div>
    <el-checkbox-group
      v-model="checkedCities"
      @change="handleCheckedCitiesChange"
    >
      <el-checkbox v-for="city in cities" :label="city" :key="city" border>{{
        city
      }}</el-checkbox>
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
        >全选</el-checkbox
      >
    </el-checkbox-group>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column label="订单ID" prop="id" width="90px" align="center"> </el-table-column>
      <el-table-column label="用户Id" prop="userId" align="center"> </el-table-column>
      <el-table-column label="用户名" prop="username" align="center"> </el-table-column>
      <el-table-column label="器材名称" prop="equipmentName" width="100px" align="center"> </el-table-column>
      <el-table-column label="数量" prop="count" width="80px" align="center"> </el-table-column>
      <el-table-column label="预约开始时间" prop="startedTime" align="center">
      </el-table-column>
      <el-table-column label="预约结束时间" prop="endedTime" align="center"> </el-table-column>
      <el-table-column align="center" width="140px">
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
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage3"
      :page-size="7"
      layout="prev, pager, next, jumper"
      :total = this.equipmentOrderList.data.total>
    </el-pagination>
  </div>
</template>

<script>
const cityOptions = ["场地预约记录", "器材预约记录"];
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      checkAll: false,
      checkedCities: ["场地预约记录"],
      cities: cityOptions,
      isIndeterminate: true,
      tableData: [
        {
          id: "",
          userId: "",
          equipmentName: "",
          count: "",
          username: "",
          startedTime: "",
          endedTime: "",
        },
      ],
      search: "",
      currentPage3: 1,
    };
  },
  mounted() {
    let userId = 202041412101;
    let data = {
      pageNum: 1,
      pageSize: 7,
    };
    this.$store
      .dispatch("equipmentOrderList", { userId, data })
      .then(() => {
      })
      .catch(() => {
        this.$message.error("错误");
        // alert("失败");
      });
      this.tableData = this.equipmentOrderList.data.list;
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        let userId = 202041412101;
    let data = {
      pageNum: 1,
      pageSize: 7,
    };
    this.$store
      .dispatch("equipmentOrderList", { userId, data })
      .then(() => {
      })
      .catch(() => {
        this.$message.error("错误");
        // alert("失败");
      });
      this.tableData = this.equipmentOrderList.data.list;
      }
  },
  computed: {
    ...mapGetters(["userInfo","equipmentOrderList"]),
  },
};
</script>

<style>
</style>