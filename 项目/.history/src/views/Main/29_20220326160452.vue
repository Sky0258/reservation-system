<template>
  <div>
    <el-table :data="tableData" style="width: 50%">
      <el-table-column prop="time" label="时段" align="center">
      </el-table-column>
      <el-table-column prop="count" label="预约数量" align="center">
      </el-table-column>
      <el-table-column prop="proportion" label="占比" align="center">
      </el-table-column>
    </el-table>
    <div ref="videoEcharts" style="width:200px;height: 300px;border:1px solid black">11111111111</div>
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
          //   this.totalPage = this.allRoles.data.total;
        })
        .catch(() => {
          this.$message.error("错误");
        });
    },
    countShow() {
      const videoOption = {
        tooltip: {
          trigger: "item",
        },
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
        series:[
            {
                data: {
                    name: '小米',
                    value: 120
                },
                type:'pie'
            }
        ],
      }
      const V = echarts.init(this.$refs.videoEcharts)
      V.setOption(videoOption)
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