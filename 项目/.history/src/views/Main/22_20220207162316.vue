<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px">添加管理员</el-button>
    <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
        <el-table-column
      label="序号"
      prop="date"
      width="60px">
    </el-table-column>
    <el-table-column
      label="用户名"
      prop="date">
    </el-table-column>
    <el-table-column
      label="用户id"
      prop="name">
    </el-table-column>
    <el-table-column
      label="电话号码"
      prop="name">
    </el-table-column>
    <el-table-column
      label="学校"
      prop="name">
    </el-table-column>
    <el-table-column
      label="班级"
      prop="name">
    </el-table-column>
    <el-table-column
      label="预约次数"
      prop="name">
    </el-table-column>
    <el-table-column
      label="违约次数"
      prop="name">
    </el-table-column>
    <el-table-column
      align="left">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="small"
          placeholder="搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    layout="prev, pager, next"
    :total="50"
    :page-size="5">
  </el-pagination>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        search: ''
      }
    },
    mounted(){
    this.$store.dispatch('managerInfo',{
      userId:this.userInfo.data.userId
    });
    },
    methods: {
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
    computed:{
    ...mapGetters(['userInfo']),
  }
};
</script>

<style scoped>
</style>