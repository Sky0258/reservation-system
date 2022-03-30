<template>
  <div>
    <el-table :data="tableData" style="width: 49%; float: left">
      <el-table-column prop="time" label="时段" align="center">
      </el-table-column>
      <el-table-column prop="count" label="预约数量" align="center">
      </el-table-column>
      <el-table-column prop="proportion" label="占比" align="center">
      </el-table-column>
    </el-table>
    <div
      id="line"
      style="height: 400px; width: 400px; border: 1px solid black"
    ></div>
    <el-pagination
      class="footer"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="8"
      layout="prev, pager, next, jumper"
      :total="totalPage"
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
          time: "8:00 ~ 9:00",
          count: "",
          proportion: "",
        },
      ],
      currentPage: 1,
      totalPage: 1,
      arr: [],
      arr1: [],
      selectData: [],
    };
  },
  mounted() {
    // this.getTimeCount();
    this.show();
  },
  methods: {
    getTimeCount() {
      let data = {
        pageNum: this.currentPage,
        pageSize: 8
      }
      this.$store
        .dispatch("timeCount",data)
        .then(() => {
          this.tableData = this.timeCount.list;
          this.totalPage = this.timeCount.
        })
        .catch(() => {
          this.$message.error("错误");
        });
    },
    show() {
      var myEcharts = echarts.init(document.getElementById("line"));
      var option = {
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
            data:[{
              name: "jingdong",
              value: 123
            }] ,
            type: "pie",
          },
        ],
      };
      myEcharts.setOption(option);
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