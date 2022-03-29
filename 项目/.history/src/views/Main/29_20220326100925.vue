<template>
  <div>
    <el-table :data="tableData" style="width: 50%">
      <el-table-column prop="time" label="时段" width="180"> </el-table-column>
      <el-table-column prop="count" label="预约数量" width="180">
      </el-table-column>
      <el-table-column prop="proportion" label="占比"> </el-table-column>
      <el-pagination
      class="footer"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="3"
      layout="prev, pager, next, jumper"
      :total="4"
    >
    </el-pagination>
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
          time:"",
          count:"",
          proportion:""
        },
      ],
    };
  },
  mounted(){
      this.getTimeCount();
  },
  methods:{
      getTimeCount(){
          this.$store
        .dispatch("timeCount")
        .then(() => {
          this.tableData = this.timeCount.data;
        })
        .catch(() => {
          this.$message.error("错误");
        });
      }
  },
  computed: {
    ...mapGetters(["timeCount"]),
  },
};
</script>

<style>
</style>