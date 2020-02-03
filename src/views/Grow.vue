<template>
  <el-container>
    <el-header>
      <nav-header />
    </el-header>
    <el-main>
      <el-row class :gutter="30">
        <el-col :span="14" :offset="1">
          <el-row class="basis-title">
            <!-- 标题 -->
            <el-col :span="12">
              <h3>成长</h3>
            </el-col>
            <el-col :span="12">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>成长</el-breadcrumb-item>
              </el-breadcrumb>
            </el-col>
          </el-row>
          <el-row>
            <new-item :dataItem="dataItem" />
            <el-pagination></el-pagination>
          </el-row>
        </el-col>
        <el-col :span="7">
          <div class="widget">
            <h3>推荐文章</h3>
            <div>
              <article-item />
            </div>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <footer-item />
    </el-footer>
  </el-container>
</template>

<script>
import NavHeader from "../components/NavHeader";
import FooterItem from "../components/FooterItem";
import ArticleItem from "../components/ArticleItem";
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
    ArticleItem,
    NewItem
  },
  methods: {
    handleSelect: function(index) {
      this.$router.push(index);
    }
  }
};
</script>

<style scoped>
@import "../assets/css/StudyBasis.css";

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
.el-col{
    padding: 0;
}
</style>

