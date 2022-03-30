<template>
  <div>
    <el-table :data="tableData" style="width: 50%; float: left">
      <el-table-column prop="time" label="时段" align="center">
      </el-table-column>
      <el-table-column prop="count" label="预约数量" align="center">
      </el-table-column>
      <el-table-column prop="proportion" label="占比" align="center">
      </el-table-column>
    </el-table>
    <div
      id="line"
      style="height: 500px; width: 500px; border: 1px solid black"
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
          time: "",
          count: "",
          proportion: "",
        },
      ],
      currentPage: 1,
      totalPage: 1,
    };
  },
  mounted() {
    this.getTimeCount();
    // this.show();
  },
  methods: {
    getTimeCount() {
      let data = {
        pageNum: this.currentPage,
        pageSize: 8,
      };
      this.$store
        .dispatch("timeCount", data)
        .then(() => {
          this.tableData = this.timeCount.data.list;
          this.totalPage = this.timeCount.data.total;
          let pieDate=[];
          for(let index in this.timeCount.data.list){
              pieDate.push({
              name: this.timeCount.data.list[index].time,
              value: this.timeCount.data.list[index].count
            })
          }
          console.log(pieDate);
          this.show(pieDate);
        })
        .catch(() => {
          this.$message.error("错误");
        });
    },
    handleCurrentChange(val) {
      let data = {
        pageNum: val,
        pageSize: 8,
      };
      this.$store
        .dispatch("timeCount", data)
        .then(() => {
          this.tableData = this.timeCount.data.list;
          this.totalPage = this.timeCount.data.total;
        })
        .catch(() => {
          this.$message.error("错误");
        });
    },
    show(pieDate) {
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
            data: pieDate,
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
  position: fixed;
  bottom: 10px;
  width: 40%;
  float: left;
}
#line {
  float: right;
}
</style>