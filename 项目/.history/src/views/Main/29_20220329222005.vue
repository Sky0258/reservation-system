<template>
  <div>
    <!-- <el-table :data="tableData" style="width: 49%; float: left">
      <el-table-column prop="time" label="时段" align="center">
      </el-table-column>
      <el-table-column prop="count" label="预约数量" align="center">
      </el-table-column>
      <el-table-column prop="proportion" label="占比" align="center">
      </el-table-column>
    </el-table>
    <el-table :data="tableData1" style="width: 49%; float: right">
      <el-table-column prop="time" label="时段" align="center">
      </el-table-column>
      <el-table-column prop="count" label="预约数量" align="center">
      </el-table-column>
      <el-table-column prop="proportion" label="占比" align="center">
      </el-table-column>
    </el-table> -->
    <div
      id="line"
      style="height: 400px; width: 400px; border: 1px solid black"
    ></div>
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
      tableData1: [
        {
          time: "",
          count: "",
          proportion: "",
        },
      ],
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
      this.$store
        .dispatch("timeCount")
        .then(() => {
          for (let index in this.timeCount.data) {
            if (index < 9) {
              this.arr.push(this.timeCount.data[index]);
            } else {
              if (8 < index && index < 14)
                this.arr1.push(this.timeCount.data[index]);
            }
          }
          this.tableData = this.arr;
          this.tableData1 = this.arr1;
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
            data: 
            type: "line",
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