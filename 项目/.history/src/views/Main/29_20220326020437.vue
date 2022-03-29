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
export default {
data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }]
}
</script>

<style>
</style>