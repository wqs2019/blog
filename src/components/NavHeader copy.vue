<template>
  <div class="container">
    <el-menu :default-active="this.$route.path"  mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        { name: "/", navItem: "首页" },
        { name: "/about", navItem: "关于" },
        { name: "/grow", navItem: "成长" },
        { name: "/study", navItem: "学习" },
        { name: "/entertain", navItem: "娱乐" },
        { name: "/help", navItem: "求助" },
        { name: "/message", navItem: "留言" }
      ]
    };
  },
  methods: {
    handleSelect: function(index, path) {
      console.log(index, path);
      this.$router.push(index)
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
.container {
  width: 100%;
  background: rgb(84, 92, 100);
}
</style>