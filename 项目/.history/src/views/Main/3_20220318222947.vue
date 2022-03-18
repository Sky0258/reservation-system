<template>
  <div class="box">
    <div class="content">
      <h1 class="title">预约运动器材</h1>
      <el-form
        class="one"
        ref="form"
        :model="sizeForm"
        label-width="80px"
        size="medium"
      >
        <el-form-item label="用户id" prop="userId">
          <el-input v-model="sizeForm.userId" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="sizeForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="预约器材" prop="equipment">
          <el-popover
            width="100"
            placement="right"
            trigger="focus"
            :content="this.num"
          >
            <!-- <el-button slot="reference">hover 激活</el-button> -->

            <el-select
              v-model="sizeForm.equipment"
              placeholder="请选择所要预约的器材"
              slot="reference"
              @change="changeValue"
            >
              <el-option
                v-popover:popover
                v-for="item in this.allEquipment.data.list"
                :key="item.id"
                :label="item.name"
                :value="`${item.id}~${item.name}`"
              ></el-option>
            </el-select>
          </el-popover>
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
            :min="1"
            :max="10"
            label="数量"
            size="small"
          >
          </el-input-number>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="onSubmit">提交预约</el-button>
          <el-button @click="resetForm('sizeForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      sizeForm: {
        userId: "",
        equipment: "",
        startTime: "",
        endTime: "",
        count: "1",
        username: "",
      },
      num: "剩余数量",
      name: "",
      visible: "true",
    };
  },
  mounted() {
    this.sizeForm.userId = this.userInfo.data.userId;
    this.sizeForm.username = this.userInfo.data.username;
    this.$store
      .dispatch("allEquipment", {
        pageNum: 1,
        pageSize: 100,
      })
      .then(() => {})
      .catch(() => {
        this.$message.error("错误");
      });
  },
  methods: {
    changeValue(value) {
      console.log(value);
      let a = value.split("~");
      this.$store
        .dispatch("allEquipment", {
          equipmentName: a[1],
          pageNum: 1,
          pageSize: 100,
        })
        .then(() => {
          this.num = "剩余数量：" + this.allEquipment.data.list[0].currentCount;
          this.$store
            .dispatch("allEquipment", {
              pageNum: 1,
              pageSize: 100,
            })
            .then(() => {})
            .catch(() => {
              this.$message.error("错误");
            });
        })
        .catch(() => {
          this.$message.error("错误");
        });
    },
    onSubmit() {
      let a = this.sizeForm.equipment.split("~");
      let userId = this.sizeForm.userId;
      let data = {
        count: this.sizeForm.count,
        endedTime: this.sizeForm.endTime,
        equipmentId: a[0],
        startedTime: this.sizeForm.startTime,
        userId: this.sizeForm.userId,
        equipmentName: a[1],
        username: this.sizeForm.username,
      };
      this.$store
        .dispatch("orderEquipment", { userId, data })
        .then(() => {
          this.$message({
            type: "success",
            message: "预约成功!",
          });
          this.sizeForm = "";
        })
        .catch(() => {
          this.$message.error("预约失败，该器材数量不足");
        });
    },
    resetForm(formName) {
      this.sizeForm = "";
    },
  },
  computed: {
    ...mapGetters(["userInfo", "allEquipment"]),
  },
};
</script>

<style scoped>
.box {
  height: 82%;
  width: 100%;
  background: url(./images/预约器材背景1.jpg);
  background-size: 100% 100%;
  margin: 0 auto;
  padding: 0;
  position: relative;
  margin-top: 0px;
}
.content {
  margin-left: 10px;
}
h1 {
  color: #409eff;
  margin-top: 0px;
  margin-bottom: 5px;
}
.one {
  border: 1px solid #e0e0e0;
  width: 300px;
  height: 370px;
  padding: 40px;
  margin: 0 auto;
  margin-top: 5px;
  padding-top: 30px;
}
</style>