<template>
  <div>
    <el-button type="primary" style="margin: 20px" @click="exportExcel"
      >导出Excel</el-button
    >
    <el-table :data="tableData" style="width: 49%; float: left">
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
    </el-table>
    <!-- <div
      style="width: 600px; height: 300px; border: 1px solid black"
      ref="videoEcharts"
    ></div>
    <div id="main" style="width: 600px; height: 400px"></div> -->
    <!-- <el-pagination
      class="footer"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="3"
      layout="prev, pager, next, jumper"
      :total="4"
    >
    </el-pagination> -->
  </div>
</template>

<script>
// import htmlToExcel from '../../utils/htmlToExcel'
import FileSaver from "file-saver";
import XLSX from "xlsx";
import { mapGetters } from "vuex";
// import * as echarts from "echarts";
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
    this.getTimeCount();
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
    exportExcel() {
       let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let name = year + "" + month + "" + day;
      // console.log(name)
      /* generate workbook object from table */
      //  .table要导出的是哪一个表格
      var wb = XLSX.utils.table_to_book(document.querySelector('el-table'));
      console.log();
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        //  name+'.xlsx'表示导出的excel表格名字
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          name + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
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