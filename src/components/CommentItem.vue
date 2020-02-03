<template>
  <div>
    <div v-for="(item,index) in commentList" :key="index">
      <el-row>
        <el-col :span="2">
          <div class="avatar">
            <img :src="item.src" />
          </div>
        </el-col>
        <el-col :span="20">
          <el-row>
            <el-col class="name" :span="23">
              {{item.name}}
              <span class="status">{{item.status}}</span>
            </el-col>
            <el-col class="commentTime" :span="1">{{item.currTime}}</el-col>
          </el-row>
          <el-row class="comment">{{item.content}}</el-row>
        </el-col>
      </el-row>
      <el-row class="callback">
        <span>{{tip}}</span>
        <span>
          <img :src="zan" @click.once="handleZan" />
          <span>{{item.zanNum}}</span>
        </span>
        <span>
          <img :src="cai" @click.once="handleCai" />
          <span>{{item.caiNum}}</span>
        </span>
      </el-row>
      
      <el-input
        v-if="flag"
        type="textarea"
        :offset="2"
        :rows="4"
        resize="none"
        placeholder="请输入内容"
        v-model="re_content"
      ></el-input>
      <p class="padding"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["commentList"],
  data() {
    return {
      zan: require("../assets/zan.svg"),
      cai: require("../assets/cai.svg"),
      re_content: "",
      flag: false,
      tip: "回复"
    };
  },
  methods: {
    handleZan: function() {
      if (this.caiNum === 0) {
        this.zanNum += 1;
        return;
      }
    },
    handleCai: function() {
      if (this.zanNum === 0) {
        this.caiNum += 1;
        return;
      }
    },
    recall: function() {
      if (!this.flag) {
        this.tip = "取消回复";
      } else {
        this.tip = "回复";
      }
      this.flag = !this.flag;
    }
  }
};
</script>

<style scoped>
.avatar {
  width: 50px;
  height: 50px;
}
.avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.name {
  color: #e74851;
  font-size: 1rem;
}
.comment {
  padding-top: 20px;
  line-height: 50px;
}
.status {
  color: #4398ed;
  font-size: 0.8rem;
}
.commentTime {
  color: silver;
  padding: 5px 0 0;
  font-size: 12px;
}
.callback {
  float: right;
  font-size: 14px;
  color: #999;
  line-height: 50px;
}
.callback span:first-child {
  cursor: pointer;
}
.callback img {
  width: 20px;
  height: 20px;
}
.callback span {
  padding: 10px;
}
.el-textarea {
  width: 90%;
  float: right;
}
.padding{
  width: 100%;
  height: 70px;
}
</style>