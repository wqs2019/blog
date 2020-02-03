<template>
  <el-row>
    <el-col :span="12" v-for="(item,index) in this.$store.state.recommandList" :key="index">
      <router-link to='/detail'>
        <el-card :body-style="{ padding: '10px' }">
          <img :src="item.src" class="image" />
          <div class="detail">
            <span class="recotitle">{{item.title}}</span>
            <div class="content">{{item.content}}</div>
            <time class="time">{{ item.createTime }}</time>
          </div>
        </el-card>
      </router-link>
    </el-col>
  </el-row>
</template>

<script>
export default {
  // props:['images'],
  data() {
    return {
    };
  }
};
</script>

<style scoped>
.el-card {
  display: flex;
  flex-direction: row;
}
.el-card:hover {
  cursor: pointer;
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
  height: 70px;
  display: block;
  float: left;
  border-radius: 10px;
}
</style>

