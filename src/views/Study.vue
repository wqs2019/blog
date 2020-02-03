<template>
  <el-container>
    <el-header>
      <nav-header />
    </el-header>
    <el-container>
      <el-main>
        <div class="main-study" v-if="getCurrRouteName==='study'">
          <el-row class="basis-title basis-width">
            <el-col :span="12">
              <h3>学习</h3>
            </el-col>
            <el-col :span="12">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>学习</el-breadcrumb-item>
              </el-breadcrumb>
            </el-col>
          </el-row>
          <el-row class="basis-content basis-width">
            <new-item :dataItem="dataItem" />
          </el-row>
        </div>
        <router-view></router-view>
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
import NewItem from "../components/NewItem";
export default {
  data() {
    return {
      dataItem: [
        {
          src:
            "http://www.zbboke.com/uploads/allimg/180626/1-1P626192T9222-lp.png",
          title: "哈佛大学用这12张图，教育了10亿人_心灵鸡",
          content: "很多人把感恩当成一种付出，其实感恩本身就是一种幸福",
          view: 100,
          author: "alan",
          category: "成长"
        },
        {
          src:
            "http://www.zbboke.com/uploads/allimg/180626/1-1P626192T9222-lp.png",
          title: "哈佛大学用这12张图，教育了10亿人_心灵鸡",
          content: "很多人把感恩当成一种付出，其实感恩本身就是一种幸福",
          view: 100,
          author: "alan",
          category: "成长"
        },
        {
          src:
            "http://www.zbboke.com/uploads/allimg/180626/1-1P626192T9222-lp.png",
          title: "哈佛大学用这12张图，教育了10亿人_心灵鸡",
          content: "很多人把感恩当成一种付出，其实感恩本身就是一种幸福",
          view: 100,
          author: "alan",
          category: "成长"
        }
      ]
    };
  },
  components: {
    NavHeader,
    FooterItem,
    NewItem
  },
  mounted() {
    console.log(this.$route);
  },
  computed: {
    getCurrRouteName: function() {
      return this.$route.name;
    }
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
/*  */
.basis-width {
  width: 65%;
}
.basis-title {
  height: 50px;
  line-height: 50px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: rgb(247, 247, 247);
}
.basis-title h3 {
  margin-left: 10px;
  color: #555;
}
.el-breadcrumb {
  line-height: 50px;
  float: right;
  padding-right: 10px;
}
</style>

