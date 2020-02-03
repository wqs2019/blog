<template>
  <el-container>
    <el-header>
      <nav-header />
    </el-header>
    <el-container>
      <el-aside width="300px">
        <el-menu :default-active="$route.path" @select="handleSelect">
          <el-menu-item index="about">
            <i class="el-icon-menu"></i>
            <span>关于我</span>
          </el-menu-item>
          <el-menu-item index="center">
            <i class="el-icon-menu"></i>
            <span>个人中心</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-row>
          <el-col :span="24">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>关于</el-breadcrumb-item>
              <el-breadcrumb-item>个人中心</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="image">
              <img src="../assets/me.png" alt />
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-footer>
      <footer-item />
    </el-footer>
  </el-container>
</template>

<script>
import NavHeader from "../components/NavHeader";
import FooterItem from "../components/FooterItem";
export default {
  data() {
    return {
   
    };
  },
  components: {
    NavHeader,
    FooterItem
  },
  methods: {
    handleSelect: function(index) {
      this.$router.push(index);
    }
  }
};
</script>

<style scoped>
.el-header,
.el-footer {
  padding: 0;
}
.el-footer {
  width: 100%;
  height: 100px !important;
}
.el-col {
  padding-top: 20px;
}
.person-detail {
  display: flex;
  flex-direction: column;
  color: #555;
}
.person-detail p {
  line-height: 30px;
}
.person-detail strong {
  font-weight: 700;
  color: black;
}
</style>

