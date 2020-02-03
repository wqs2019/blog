<template>
  <el-row>
    <el-col :span="24" v-for="(item,index) in images" :key="index">
      <el-card :body-style="{ padding: '10px' }">
        <img :src="item.src" class="image" />
        <div class="detail">
          <span class="recotitle">{{item.title}}</span>
          <div class="content">{{item.content}}</div>
          <time class="time">{{ currentDate }}</time>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      images: [
        {
          src: "http://www.zbboke.com/uploads/161121/1-1611211H235553.jpg",
          title: "哈佛大学用这12张图，教育了10亿人_心灵鸡",
          content: "很多人把感恩当成一种付出，其实感恩本身就是一种幸福",
          time: "2018-10-20",
          view: "100"
        },
        {
          src: "http://www.zbboke.com/uploads/161021/1-161021195620547.jpg",
          title: "哈佛大学用这12张图，教育了10亿人_心灵鸡",
          content: "很多人把感恩当成一种付出，其实感恩本身就是一种幸福",
          time: "2018-10-20",
          view: "100"
        },
        {
          src: "http://www.zbboke.com/uploads/161125/1-1611251H645N2.jpg",
          title: "哈佛大学用这12张图，教育了10亿人_心灵鸡",
          content: "很多人把感恩当成一种付出，其实感恩本身就是一种幸福",
          time: "2018-10-20",
          view: "100"
        },
        {
          src: "http://www.zbboke.com/uploads/161125/1-1611251H645N2.jpg",
          title: "哈佛大学用这12张图，教育了10亿人_心灵鸡",
          content: "很多人把感恩当成一种付出，其实感恩本身就是一种幸福",
          time: "2018-10-20",
          view: "100"
        }
      ],
      currentDate: new Date().toLocaleString()
    };
  }
};
</script>

<style scoped>
.el-card {
  display: flex;
  flex-direction: row;
}
.time {
  font-size: 0.8rem;
  color: #999;
  float: right;
  padding-right: 0.8rem;
}
.recotitle {
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 1rem;
}
.content {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 12px;
  color: #999;
  margin: 0 0 10px;
  text-align: left;
  line-height: 20px;
}
.detail {
  padding-left: 10px;
  width: 65%;
  float: left;
}

.image {
  width: 25%;
  height: 60px;
  display: block;
  float: left;
  border-radius: 10px;
}
</style>

