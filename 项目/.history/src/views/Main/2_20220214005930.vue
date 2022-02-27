<template>
  <div>
    <h1 class="title">预约运动器材</h1>
    <el-form
      class="one"
      ref="form"
      :model="sizeForm"
      label-width="80px"
      size="medium"
    >
      <el-form-item label="用户id" prop="userId">
        <el-input v-model="sizeForm.userId"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="sizeForm.username"></el-input>
      </el-form-item>
      <el-form-item label="预约器材" prop="equipment">
        <el-select
          v-model="sizeForm.equipment"
          placeholder="请选择所要预约的器材"
        >
          <el-option label="篮球" value="2"></el-option>
          <el-option label="匹克球球 / 拍" value="beijing"></el-option>
          <el-option label="羽毛球 / 拍" value="beijing"></el-option>
          <el-option label="乒乓球 / 拍" value="beijing"></el-option>
          <el-option label="网球 / 拍" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间" prop="startTime">
        <el-date-picker
          v-model="sizeForm.startTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="请选择开始的日期和时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker
          v-model="sizeForm.endTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="请选择结束的日期和时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="器材数量" prop="count">
        <el-input-number
          v-model="sizeForm.count"
          @change="handleChange"
          :min="1"
          :max="10"
          label="数量"
          size="small"
        ></el-input-number>
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
      sizeForm: {
        userId: "",
        equipment: "",
        startTime: "",
        endTime: "",
        count: "1",
        username:""
      },
    };
  },
  methods: {
    onSubmit() {
      let userId = this.sizeForm.userId;
      let data = {
        count: this.sizeForm.count,
        endedTime: this.sizeForm.endTime,
        equipmentId: this.sizeForm.equipment,
        equipmentName: this.sizeForm.endTime,
        startedTime: this.sizeForm.startTime,
        username: this.sizeForm.username
      };
      this.$store.dispatch("orderEquipment", {userId , data});
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange(value) {
      console.log(value);
    },
  },
};
</script>

<style scoped>
h1 {
  color: #409eff;
}
.one {
  border: 1px solid #e0e0e0;
  width: 300px;
  height: 350px;
  padding: 40px;
  margin: 0 auto;
}
</style>