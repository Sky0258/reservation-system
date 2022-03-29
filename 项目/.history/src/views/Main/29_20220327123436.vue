<template>
  <div>
    <el-table :data="tableData" style="width: 50%;float: left">
      <el-table-column prop="time" label="时段" align="center">
      </el-table-column>
      <el-table-column prop="count" label="预约数量" align="center">
      </el-table-column>
      <el-table-column prop="proportion" label="占比" align="center">
      </el-table-column>
    </el-table>
    <el-table :data="tableData" style="width: 50%;float: right">
      <el-table-column prop="time" label="时段" align="center">
      </el-table-column>
      <el-table-column prop="count" label="预约数量" align="center">
      </el-table-column>
      <el-table-column prop="proportion" label="占比" align="center">
      </el-table-column>
    </el-table>
    <!-- <div
      style="width: 600px; height: 300px; border: 1px solid black"
      ref="videoEcharts"
    ></div>
    <div id="main" style="width: 600px; height: 400px"></div> -->
    <el-pagination
      class="footer"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="3"
      layout="prev, pager, next, jumper"
      :total="4"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as echarts from "echarts";
export default {
  data() {
    return {
      tableData: [
        {
          time: "",
          count: "",
          proportion: "",
        },
      ],
      currentPage: 1,
    };
  },
  mounted() {
    this.getTimeCount();
    this.drawChart();
    this.countShow();
  },
  methods: {
    getTimeCount() {
      this.$store
        .dispatch("timeCount")
        .then(() => {
          this.tableData = this.timeCount.data;
        })
        .catch(() => {
          this.$message.error("错误");
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      let data = {
        pageNum: val,
        pageSize: 6,
      };
      this.$store
        .dispatch("allRoles", {
          userId: this.userInfo.data.userId,
          data,
        })
        .then(() => {
          this.tableData = this.allRoles.data;
          this.countShow();
          //   this.totalPage = this.allRoles.data.total;
        })
        .catch(() => {
          this.$message.error("错误");
        });
    },
    countShow() {
      const videoOption = {
        color: [
          "#c23531",
          "#2f4554",
          "#61a0a8",
          "#d48265",
          "#91c7ae",
          "#749f83",
          "#ca8622",
          "#bda29a",
          "#6e7074",
          "#546570",
          "#c4ccd3",
        ],
        series: [
          {
            data: [
              {
                name: "小米",
                value: 120,
                type: "pie",
              },
              {
                name: "京东",
                value: 230,
                type: "pie",
              },
            ],
          },
        ],
      };
      const V = echarts.init(this.$refs.videoEcharts);
      V.setOption(videoOption);
    },
  },
  computed: {
    ...mapGetters(["timeCount"]),
  },
};
</script>

<style scoped>
.footer {
  width: 50%;
  float: left;
}
</style>