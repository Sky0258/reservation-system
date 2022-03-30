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
    <div id="line"></div>
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
    this.allTime();
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
          let pieDate = [];
          for (let index in this.timeCount.data.list) {
            pieDate.push({
              name: this.timeCount.data.list[index].time,
              value: this.timeCount.data.list[index].count,
            });
          }
          console.log(pieDate);
          this.show(pieDate);
        })
        .catch(() => {
          this.$message.error("错误");
        });
    },
    allTime() {
      let data = {
        pageNum: 1,
        pageSize: 20,
      };
      this.$store
        .dispatch("timeCount", data)
        .then(() => {
          let pieDate = [];
          for (let index in this.timeCount.data.list) {
            pieDate.push({
              name:
                this.timeCount.data.list[index].time.substr(0, 5) +
                this.timeCount.data.list[index].time.substr(8, 6),
              value: this.timeCount.data.list[index].count,
            });
          }
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
          "#37A2DA",
          "#32C5E9",
          "#67E0E3",
          "#9FE6B8",
          "#FFDB5C",
          "#ff9f7f",
          "#fb7293",
          "#E062AE",
          "#E690D1",
          "#e7bcf3",
          "#9d96f5",
          // "#8378EA",
        ],
        series: [
          {
            radius: [35, 140],
            itemStyle: {
              borderRadius: 3,
            },
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
  height: 390px;
  width: 520px;
  margin-top: 20px;
  border: 1px solid black;
  text-align: center;
}
</style>