<template>
  <div>
    <!-- <el-checkbox-group
      v-model="checkedCities"
      @change="handleCheckedCitiesChange"
      style="margin-bottom: 10px"
    >
      <el-checkbox v-for="city in cities" :label="city" :key="city" border>{{
        city
      }}</el-checkbox>
    </el-checkbox-group> -->
    <el-radio
      v-model="radio2"
      label="1"
      border
      size="medium"
      @change="handleCheckedCitiesChange"
      >器材预约记录</el-radio
    >
    <el-radio
      v-model="radio2"
      label="2"
      border
      size="medium"
      @change="handleCheckedCitiesChange"
      >场地预约记录</el-radio
    >
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="订单ID" prop="id" width="90px" align="center">
      </el-table-column>
      <el-table-column label="用户Id" prop="userId" align="center">
      </el-table-column>
      <el-table-column label="用户名" prop="username" align="center">
      </el-table-column>
      <el-table-column
        :label="labelName"
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
        v-if="labelName == '器材名称'"
      >
      </el-table-column>
      <el-table-column label="预约开始时间" prop="startedTime" align="center">
      </el-table-column>
      <el-table-column label="预约结束时间" prop="endedTime" align="center">
      </el-table-column>
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
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="7"
      layout="prev, pager, next, jumper"
      :total="this.equipmentOrderList.data.total"
      class="footer"
    >
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
      currentPage: 1,
      labelName: "器材名称",
      radio2: "1",
    };
  },
  mounted() {
    let userId = this.userInfo.data.userId;
    let data = {
      pageNum: 1,
      pageSize: 7,
    };
    this.$store
      .dispatch("equipmentOrderList", { userId, data })
      .then(() => {
        this.tableData = this.equipmentOrderList.data.list;
      })
      .catch(() => {
        this.$message.error("错误");
      });
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
      console.log(value);
      if (value == 1) {
        this.labelName = "器材名称";
        let userId = this.userInfo.data.userId;
        let data = {
          pageNum: 1,
          pageSize: 7,
        };
        this.$store
          .dispatch("equipmentOrderList", { userId, data })
          .then(() => {
            this.tableData = this.equipmentOrderList.data.list;
          })
          .catch(() => {
            this.$message.error("错误");
          });
      } else if (value == 2) {
        this.labelName = "场地名称";
        let userId = this.userInfo.data.userId;
        let data = {
          pageNum: 1,
          pageSize: 7,
        };
        this.$store
          .dispatch("siteOrderList", { userId, data })
          .then(() => {
            this.tableData = this.siteOrderList.data.list;
          })
          .catch(() => {
            this.$message.error("错误");
          });
      }
    },
    handleDelete(index, row) {
      if (this.labelName == "器材名称") {
        this.$confirm("此操作将取消该预约记录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$store
              .dispatch("cancelEquipment", {
                userId: this.userInfo.data.userId,
                equipmentOrderId: row.id,
              })
              .then(() => {
                let userId = this.userInfo.data.userId;
                let data = {
                  pageNum: 1,
                  pageSize: 7,
                };
                this.$store
                  .dispatch("equipmentOrderList", { userId, data })
                  .then(() => {
                    this.tableData = this.equipmentOrderList.data.list;
                  })
                  .catch(() => {
                    this.$message.error("错误");
                  });
              })
              .catch(() => {
                alert("删除失败！");
              });
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },

    handleCurrentChange(val) {
      let userId = this.userInfo.data.userId;
      let data = {
        pageNum: val,
        pageSize: 7,
      };
      this.$store
        .dispatch("equipmentOrderList", { userId, data })
        .then(() => {
          this.tableData = this.equipmentOrderList.data.list;
        })
        .catch(() => {
          this.$message.error("错误");
        });
    },
  },
  computed: {
    ...mapGetters(["userInfo", "equipmentOrderList", "siteOrderList"]),
  },
};
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 5px;
  height: 40px;
  left: 100px;
  width: 100%;
  text-align: center;
}
</style>