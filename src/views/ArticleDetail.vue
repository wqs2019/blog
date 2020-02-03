<template>
  <el-container>
    <el-header>
      <nav-header />
    </el-header>
    <el-main>
      <el-row class :gutter="30">
        <el-col :span="14" :offset="1">
          <el-row class="title">文章标题</el-row>
          <el-row class="tips">
            <i class="fa fa-user-o" aria-hidden="true"></i> 张兵
            <i class="fa fa-clock-o" aria-hidden="true"></i> 2017-10-14
            <i class="fa fa-eye" aria-hidden="true"></i> 2433次浏览
          </el-row>
          <el-row>
            <el-row class="sumary">
              <el-alert title="摘要: 你哈哈发i师傅后的说法卡号发到空间是否" type="success"  :closable="false"></el-alert>
            </el-row>
            <el-row>以下就是文章正文部分</el-row>
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

export default {
  data() {
    return {};
  },
  components: {
    NavHeader,
    FooterItem,
    ArticleItem
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
.title {
  font-size: 20px;
  height: 50px;
  line-height: 50px;
  margin: 5px 0;
  background: rgb(247, 247, 247);
}
.tips {
  line-height: 40px;
  background: rgb(247, 247, 247);
}
.tips i {
  padding-left: 10px;
}
.sumary {
  padding: 30px 0 30px 0;
}
.el-alert__title{
  font-size: 16px !important;
}
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
.el-col {
  padding: 0;
}
</style>

