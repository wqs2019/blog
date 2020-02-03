<template>
  <el-row :gutter="30">
    <el-col :span="14" :offset="1">
      <el-row class="basis-title">
        <!-- 标题 -->
        <el-col :span="12">
          <h3>前端基础</h3>
        </el-col>
        <el-col :span="12">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>学习</el-breadcrumb-item>
            <el-breadcrumb-item>前端基础</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
      <el-row>
        <new-item :dataItem="dataItem" />
        <el-pagination
          @current-change="current_change"
          :page="page"
          :page-size="pagesize"
          layout="prev, pager, next"
          :total="this.dataItem.length"
        ></el-pagination>
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
</template>

<script>
import NewItem from "../../components/NewItem";
import ArticleItem from "../../components/ArticleItem";

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
      ],
      page: 1, //当前页码
      pagesize: 5 //每页的数据条数
    };
  },
  components: {
    NewItem,
    ArticleItem
  },
  methods: {
    current_change(val) {
      this.page = val;
      // this.getnewslist();
      console.log(val);
    },
    // 	分页参数的写法
    fenyedata() {
      const postdata = new URLSearchParams();
      postdata.append("pagesize", this.pagesize);
      postdata.append("page", this.page);
      return postdata;
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/StudyBasis.css";
.widget {
  width: 98%;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: left;
}
.widget h3 {
  border-radius: 5px 5px 0 0;
  position: relative;
  margin: 0;
  padding: 11px 15px 14px;
  border-bottom: 1px solid #eaeaea;
  background-color: #fbfbfb;
  font-weight: 400;
  font-size: 18px;
  line-height: 20px;
}
</style>