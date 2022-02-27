<template>
  <div>
  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
    <el-checkbox v-for="city in cities" :label="city" :key="city" border>{{city}}</el-checkbox>
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
  </el-checkbox-group>
  <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="订单ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="用户Id"
      prop="userId">
    </el-table-column>
    <el-table-column
      label="用户名"
      prop="username">
    </el-table-column>
    <el-table-column
      label="器材名称"
      prop="equipmentName">
    </el-table-column>
    <el-table-column
      label="数量"
      prop="count">
    </el-table-column>
    <el-table-column
      label="预约开始时间"
      prop="startedTime">
    </el-table-column>
    <el-table-column
      label="预约结束时间"
      prop="endedTime">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
const cityOptions = ['场地预约记录','器材预约记录'];

export default {
  data() {
      return {
        checkAll: false,
        checkedCities: ['场地预约记录'],
        cities: cityOptions,
        isIndeterminate: true,
        tableData: [{
          id: "",
          userId: "",
          equipmentName: "",
          count: "",
          username: "",
          startedTime: "",
          endedTime: ""
        }],
        search: ''
      };
    },
    mounted(){
      this.$store
              .dispatch("userLogin", {
                captcha: this.loginForm.checkNumber,
                password: this.loginForm.password,
                userId: this.loginForm.id,
              }).then(() => {
                this.$message.error('错误');
              })
          .catch (() => {
            alert("失败");
          });
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
}
</script>

<style>

</style>