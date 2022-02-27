<template>
  <div>
    <h1 class="one">器材订单</h1>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.username.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="订单ID" prop="id" width="90px" align="center">
      </el-table-column>
      <el-table-column label="用户ID" prop="userId" align="center">
      </el-table-column>
      <el-table-column
        label="用户名"
        prop="username"
        width="100px"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="器材名称"
        prop="equipmentName"
        width="100px"
        align="center"
      >
      </el-table-column>
      <el-table-column label="预约开始时间" prop="startedTime" align="center">
      </el-table-column>
      <el-table-column label="预约结束时间" prop="endedTime" align="center">
      </el-table-column>
      <el-table-column
        label="是否取消"
        prop="isDelete"
        width="100px"
        align="center"
      >
      </el-table-column>
      <el-table-column align="right" width="150px">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="small" placeholder="搜索用户名" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="footer"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="7"
      layout="prev, pager, next, jumper"
      :total="this.siteAllList.data.total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>