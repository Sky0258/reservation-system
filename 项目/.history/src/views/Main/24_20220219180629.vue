<template>
  <div>
    <h1 class="one">器材订单</h1>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      tableData: [
        {
          id: "",
          userId: "",
          username: "",
          equipmentName: "",
          count: "",
          startedTime: "",
          endedTime: "",
          isDelete: "",
        },
      ],
      search: "",
    };
  },
  mounted() {
    let userId = this.userInfo.data.userId;
    let data = {
      pageNum: 1,
      pageSize: 6,
    };
    this.$store
      .dispatch("equipmentAllList", { userId, data })
      .then(() => {
        this.tableData = this.equipmentAllList.data.list;
      })
      .catch(() => {
        this.$message.error("错误");
      });
  },
  methods: {
    handleCurrentChange(val) {
      let userId = this.userInfo.data.userId;
      let data = {
        pageNum: val,
        pageSize: 6,
      };
      this.$store
        .dispatch("equipmentAllList", { userId, data })
        .then(() => {
          this.tableData = this.equipmentAllList.data.list;
        })
        .catch(() => {
          this.$message.error("错误");
        });
    },
  },
  computed: {
    ...mapGetters(["userInfo", "equipmentAllList"]),
  },
};
</script>

<style scoped>
h1 {
  color: #409eff;
}
.footer {
  position: fixed;
  bottom: 10px;
  height: 40px;
  left: 100px;
  width: 100%;
  text-align: center;
}
</style>