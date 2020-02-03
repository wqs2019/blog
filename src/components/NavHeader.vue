<template>
  <div class="container">
    <el-menu
      :default-active="this.$route.path"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/" class="menu">首页</el-menu-item>
      <el-submenu index="/about">
        <template slot="title">关于</template>
        <el-menu-item index="/about">关于我</el-menu-item>
        <el-menu-item index="/center">个人中心</el-menu-item>
      </el-submenu>
      <el-menu-item index="/grow">成长</el-menu-item>
      <!-- <el-menu-item index="/study">学习</el-menu-item> -->
      <el-submenu index="/study">
        <template slot="title">学习</template>
        <el-menu-item index="/study/basis">前端基础</el-menu-item>
        <el-menu-item index="/study/frame">前端框架</el-menu-item>
        <el-menu-item index="/study/algorithm">算法与数据结构</el-menu-item>
        <el-menu-item index="/study/network">计算机网络</el-menu-item>
      </el-submenu>
      <el-menu-item index="/entertain">娱乐</el-menu-item>
      <el-menu-item index="/help">求助</el-menu-item>
      <el-menu-item index="/message">留言</el-menu-item>
      <el-menu-item class="searchInput">
        <el-input placeholder="请输入内容" v-model="keyword">
          <el-button @click="setAuthor" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: ""
    };
  },
  computed: {
    // author() {
    //   return this.$store.state.author;
    // }
  },
  mounted: function() {},
  methods: {
    handleSelect: function(index, path) {
      console.log(index, path);
      this.$router.push(index);
    },
    setAuthor: function() {
      this.$store.state.author = this.keyword;
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
a:visited {
  color: white;
}
.el-menu {
  width: 80%;
  margin: 0 auto;
}
.searchInput {
  float: right !important;
}
.container {
  width: 100%;
  background: rgb(84, 92, 100);
}
</style>