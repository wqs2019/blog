<template>
  <el-row>
    <el-col :span="24" v-for="(item,index) in dataItem" :key="index">
      <el-card :body-style="{ padding: '10px' }" class="newItem-body">
        <img :src="item.src" class="image" />
        <div class="detail">
          <span class="newtitle">{{item.title}}</span>
          <div class="content">{{item.content}}</div>
          <div class="tip">
            <span class="author">作者：{{item.author}}</span>
            <span class="time">时间：{{ currentDate }}</span>
            <span class="view">浏览量：{{ item.view }}</span>
            <span class="category">博客：{{ item.category }}</span>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props:["dataItem"],
  data() {
    return {
      currentDate: new Date().toDateString()
    };
  }
};
</script>

<style>
.newItem-body {
  height: 200px;
}
.el-card {
  display: flex;
  flex-direction: row;
  width: 100%;
  cursor: pointer;
}
.el-card__body {
  width: 100%;
}
@keyframes myfirst {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.01);
  }
  50% {
    transform: scale(1.02);
  }
  75% {
    transform: scale(1.03);
  }
  100% {
    transform: scale(1.04);
  }
}
.el-card__body:hover {
  animation: myfirst linear 0.5s alternate forwards;
}
.tip {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  font-size: 0.8rem;
  /* margin-top: 30%; */
}
.time {
  font-size: 13px;
  color: #999;
  float: right;
}
.newtitle {
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 16px;
  line-height: 20px;
  padding-bottom: 5px;
}
.content {
  font-size: 14px;
  color: #999;
  margin: 0 0 10px;
  text-align: left;
  line-height: 24px;
  padding-bottom: 5px;
}
.detail {
  padding: 5px;
  width: 50%;
  float: right;
}

.image {
  width: 45%;
  display: block;
  float: left;
  border-radius: 10px;
}
</style>

