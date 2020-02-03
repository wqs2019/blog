<template>
  <div class="home">
    <nav-header />
    <div class="wrap">
      <el-carousel indicator-position="none">
        <el-carousel-item v-for="(item,index) in image" :key="index">
          <img :src="item" alt />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="wrap">
      <el-container>
        <el-main>
          <div class="recommend">
            <div class="title">特别推荐</div>
            <div class="content">
              <reco-item />
            </div>
          </div>
          <div class="newPost">
            <div class="title">最新发布</div>
            <div class="content">
              <new-item :dataItem="dataItem" />
            </div>
          </div>
        </el-main>
        <el-aside width="400px">
          <div class="widget">
            <!-- 热门标签 -->
            <h3>热门标签</h3>
            <div>
              <ul class="tag_list">
                <li v-for="(item,index) in this.$store.state.tagList" :key="index">{{item.name}}</li>
              </ul>
            </div>
          </div>
          <!-- 推荐文章 -->
          <div class="widget">
            <h3>推荐文章</h3>
            <div>
              <article-item />
            </div>
          </div>
          <!-- 统计 -->
          <div class="widget">
            <a>
              <el-tag type="success" effect="dark">统计</el-tag>
            </a>
            <p class="sumary">
              <span>
                本站运行：
                <strong>1137</strong>天
              </span>
              <span>
                本月更新：
                <strong>34</strong>篇
              </span>
              <span>
                共有文章：
                <strong>304</strong>篇
              </span>
            </p>
          </div>
          <!-- 分享 -->
          <div class="widget share">
            <a>
              <el-tag type="success" effect="dark">分享</el-tag>
            </a>
            <p class="sumary share">
              <span>
                本站运行：
                <strong>1137</strong>天
              </span>
              <span>
                本月更新：
                <strong>34</strong>篇
              </span>
              <span>
                共有文章：
                <strong>304</strong>篇
              </span>
            </p>
          </div>
          <!-- 链接 -->
          <div class="widget link">
            <a>
              <el-tag type="success" effect="dark">分享链接</el-tag>
            </a>
            <div class="list">
              <ul>
                <li>
                  <p>第一个</p>
                </li>
                <li>
                  <p>第一个</p>
                </li>
                <li>
                  <p>第一个</p>
                </li>
                <li>
                  <p>第一个</p>
                </li>
                <li>
                  <p>第一个</p>
                </li>
                <li>
                  <p>第一个</p>
                </li>
                <li>
                  <p>第一个</p>
                </li>
                <li>
                  <p>第一个</p>
                </li>
                <li>
                  <p>第一个</p>
                </li>
              </ul>
            </div>
          </div>
          <!-- 广告位 -->
          <div class="widget ad">
            <a>
              <el-tag type="success" effect="dark">广告位</el-tag>
            </a>
            <img src="http://www.zbboke.com/templets/boke/img/250-250.jpg" alt />
          </div>
        </el-aside>
      </el-container>
    </div>
    <el-backtop></el-backtop>
    <footer-item />
  </div>
</template>

<script>
// @ is an alias to /src
import NavHeader from "@/components/NavHeader.vue";
import RecoItem from "@/components/RecoItem.vue";
import NewItem from "@/components/NewItem.vue";
import ArticleItem from "@/components/ArticleItem.vue";
import FooterItem from "@/components/FooterItem.vue";
import { async } from "q";

export default {
  data() {
    return {
      image: [
        "http://www.zbboke.com/templets/boke/picture/banner.gif",
        "http://www.zbboke.com/templets/boke/picture/banner_1.jpg",
        "http://www.zbboke.com/templets/boke/picture/banner_3.jpg"
      ],
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
          src: "http://www.zbboke.com/uploads/180604/1-1P604194145926.jpg",
          title: "为什么男人喜欢绿茶表,这让女汉子如何活呀",
          content:
            "今天咱们来谈谈绿茶婊 绿茶婊 泛指那些外表清新脱俗， 内心工于心计的女子。很多人把感恩当成一种付出，其实感恩本身就是一种幸福",
          author: "alan",
          view: 100,
          category: "成长"
        },
        {
          src: "http://www.zbboke.com/uploads/180603/1-1P6031F320R0.png",
          title: "哈佛大学用这12张图，教育了10亿人_心灵鸡",
          content: "很多人把感恩当成一种付出，其实感恩本身就是一种幸福",
          author: "alan",
          view: 100,
          category: "成长"
        },
        {
          src: "http://www.zbboke.com/uploads/180603/1-1P6031F320R0.png",
          title: "哈佛大学用这12张图，教育了10亿人_心灵鸡",
          content: "很多人把感恩当成一种付出，其实感恩本身就是一种幸福",
          author: "alan",
          view: 100,
          category: "成长"
        },
        {
          src: "http://www.zbboke.com/uploads/171206/1-1G206160430533.png",
          title: "哈佛大学用这12张图，教育了10亿人_心灵鸡",
          content: "很多人把感恩当成一种付出，其实感恩本身就是一种幸福",
          author: "alan",
          view: 100,
          category: "成长"
        },
        {
          src:
            "http://www.zbboke.com/uploads/allimg/171021/1644464127-0-lp.jpg",
          title: "哈佛大学用这12张图，教育了10亿人_心灵鸡",
          content: "很多人把感恩当成一种付出，其实感恩本身就是一种幸福",
          author: "alan",
          view: 100,
          category: "成长"
        },
        {
          src: "http://www.zbboke.com/uploads/170826/1-1FR6151911922.jpg",
          title: "哈佛大学用这12张图，教育了10亿人_心灵鸡",
          content: "很多人把感恩当成一种付出，其实感恩本身就是一种幸福",
          author: "alan",
          view: 100,
          category: "成长"
        },
        {
          src: "http://www.zbboke.com/uploads/170930/1-1F93009532O46.jpg",
          title: "哈佛大学用这12张图，教育了10亿人_心灵鸡",
          content: "很多人把感恩当成一种付出，其实感恩本身就是一种幸福",
          author: "alan",
          view: 100,
          category: "成长"
        },
        {
          src: "http://www.zbboke.com/uploads/170208/1-1F20QT0555I.jpg",
          title: "哈佛大学用这12张图，教育了10亿人_心灵鸡",
          content: "很多人把感恩当成一种付出，其实感恩本身就是一种幸福",
          author: "alan",
          view: 100,
          category: "成长"
        },
        {
          src: "http://www.zbboke.com/uploads/170916/1-1F9161F413H6.jpg",
          title: "哈佛大学用这12张图，教育了10亿人_心灵鸡",
          content: "很多人把感恩当成一种付出，其实感恩本身就是一种幸福",
          author: "alan",
          view: 100,
          category: "成长"
        }
      ],
      // images: []
    };
  },
  mounted: async function() {
    const username = await this.$axios.post(
      `http://localhost/api/user/getUser`
    );
    const {data} = await this.$axios.get(
      `http://localhost/api/blog/recommandList`
    );
    const tagsData = await this.$axios.get(`http://localhost/api/blog/getTags`);
    // console.log("获取用户名", username);
    // console.log(tagsData);

    this.$store.state.recommandList = data.data;
    this.$store.state.tagList = tagsData.data.data;
  },
  components: {
    NavHeader,
    RecoItem,
    NewItem,
    ArticleItem,
    FooterItem
  }
};
</script>
<style scoped>
@import "../assets/css/Home.css";
</style>