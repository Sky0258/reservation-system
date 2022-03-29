<template>
  <div>
    <el-table :data="tableData" style="width: 50%">
      <el-table-column prop="time" label="时段" width="180"> </el-table-column>
      <el-table-column prop="count" label="预约数量" width="180">
      </el-table-column>
      <el-table-column prop="proportion" label="占比"> </el-table-column>
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
  methods:{
      
  },
  computed: {
    ...mapGetters(["timeCount"]),
  },
};
</script>

<style>
</style>