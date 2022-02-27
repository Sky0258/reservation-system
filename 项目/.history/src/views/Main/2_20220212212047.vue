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
  <el-form-item label="活动时间">
    <el-date-picker
      v-model="value1"
      type="datetime"
      placeholder="请选择开始的日期和时间">
    </el-date-picker>
    —
    <el-date-picker
      v-model="value2"
      type="datetime"
      placeholder="请选择结束的日期和时间">
    </el-date-picker>
  </el-form-item>
  <el-form-item label="活动性质">
    <el-checkbox-group v-model="sizeForm.type">
      <el-checkbox-button label="美食/餐厅线上活动" name="type"></el-checkbox-button>
      <el-checkbox-button label="地推活动" name="type"></el-checkbox-button>
      <el-checkbox-button label="线下主题活动" name="type"></el-checkbox-button>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="特殊资源">
    <el-radio-group v-model="sizeForm.resource" size="medium">
      <el-radio border label="线上品牌商赞助"></el-radio>
      <el-radio border label="线下场地免费"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item size="large">
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
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
      }
    }
}
</script>

<style>

</style>