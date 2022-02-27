<template>
  <div>
      <el-select v-model="value" placeholder="请选择" @change="show">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
  </div>
</template>

<script>
export default {
     data() {
      return {
        options: [{
          value: '0',
          label: '篮球场'
        }, {
          value: '1',
          label: '羽毛球场'
        }, {
          value: '2',
          label: '乒乓球场'
        }, {
          value: '3',
          label: '网球场'
        }, {
          value: '4',
          label: '匹克球场'
        }, {
          value: '5',
          label: '游泳馆'
        }],
        value: '0'
      }
    },
    methods:{
        show(value) {
            console.log(value);
        }
    }
}
</script>

<style>

</style>