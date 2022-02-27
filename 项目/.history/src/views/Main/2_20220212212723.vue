<template>
  <div>
      <el-form ref="form" :model="sizeForm" label-width="80px" size="medium">
  <el-form-item label="用户id">
    <el-input v-model="sizeForm.name"></el-input>
  </el-form-item>
  <el-form-item label="预约器材">
    <el-select v-model="sizeForm.region" placeholder="请选择所要预约的器材">
      <el-option label="篮球" value="shanghai"></el-option>
      <el-option label="匹克球球 / 拍" value="beijing"></el-option>
      <el-option label="羽毛球 / 拍" value="beijing"></el-option>
      <el-option label="乒乓球 / 拍" value="beijing"></el-option>
      <el-option label="网球 / 拍" value="beijing"></el-option>
      
    </el-select>
  </el-form-item>
  <el-form-item label="开始时间">
    <el-date-picker
      v-model="value1"
      type="datetime"
      placeholder="请选择开始的日期和时间">
    </el-date-picker>
    </el-form-item>
    <el-form-item label="结束时间">
    <el-date-picker
      v-model="value2"
      type="datetime"
      placeholder="请选择结束的日期和时间">
    </el-date-picker>
  </el-form-item>
  <el-form-item label="器材数量">
    <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="数量" size="small"></el-input-number>
  </el-form-item>
  <el-form-item size="large">
    <el-button type="primary" @click="onSubmit">提交预约</el-button>
    <el-button @click="resetForm('sizeForm')">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
export default {
    data() {
      return {
        value1: '',
        value2: '',
        num: 1,
        sizeForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      };
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleChange(value) {
        console.log(value);
      }
    }
}
</script>

<style>

</style>