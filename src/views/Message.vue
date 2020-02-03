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
              <h3>留言</h3>
            </el-col>
            <el-col :span="12">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>留言</el-breadcrumb-item>
              </el-breadcrumb>
            </el-col>
          </el-row>
          <el-row class="avatar">
            <p @click="drawer = true">fdsafdsa</p>
            <el-avatar icon="el-icon-user-solid" :src="imgSrc"></el-avatar>
          </el-row>
          <el-row>
            <el-input
              type="textarea"
              :rows="4"
              resize="none"
              placeholder="请输入内容"
              v-model="inputing"
              class="input_area"
            ></el-input>
            <el-row class="post_btn">
              <img src="../assets/post-btn.png" @click="btnPost" />
            </el-row>
          </el-row>
          <el-row>
            <comment-item :commentList="commentList" class="itemContainer" />
          </el-row>
        </el-col>
        <el-col :span="7">
          <div class="widget">
            <h3>推荐文章</h3>
            <div>
              <article-item class="comment-item" />
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 个人中心，抽屉形式展开 -->
      <el-drawer
        title="个人中心"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
        size="40%"
      >
        <el-row>
          <el-col :span="6">
            <img src="../assets/me.png" alt />
          </el-col>
          <el-col :span="14" class="name">
            <span>{{username}}</span>
            <i class="fa fa-pencil-square-o" aria-hidden="true" @click="changeName"></i>
          </el-col>
          <el-col :span="4">
            <p>80后/男</p>
          </el-col>
        </el-row>
        <el-row>
          <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
            <el-tab-pane label="评论" name="comment">评论</el-tab-pane>
            <el-tab-pane label="收藏" name="like">收藏</el-tab-pane>
            <el-tab-pane label="回复" name="reply">回复</el-tab-pane>
          </el-tabs>
        </el-row>
      </el-drawer>
    </el-main>
    <el-footer>
      <footer-item />
    </el-footer>
    <login-item
      v-if="isLogin"
      :dialogVisible="dialogVisible"
      v-on:close="close"
      v-on:toRegister="toRegister"
    />
    <register-item
      v-if="isRegister"
      :dialogVisible="dialogVisible"
      v-on:close="close"
      v-on:returnLogin="returnLogin"
    />
  </el-container>
</template>

<script>
import NavHeader from "../components/NavHeader";
import FooterItem from "../components/FooterItem";
import ArticleItem from "../components/ArticleItem";
import CommentItem from "../components/CommentItem";
import LoginItem from "../components/LoginItem";
import RegisterItem from "../components/RegisterItem";
import { async } from "q";

export default {
  data() {
    return {
      content: "",
      inputing: "",
      commentList: [],
      isLogin: false,
      isRegister: false,
      dialogVisible: false,
      drawer: false,
      direction: "rtl",
      imgSrc: "",
      errno: "",
      activeName: "comment",
      username: ""
    };
  },
  components: {
    NavHeader,
    FooterItem,
    ArticleItem,
    CommentItem,
    LoginItem,
    RegisterItem
  },
  mounted: async function() {
    const data = await this.$axios.post(`http://localhost/api/user/getUser`);
    // console.log(data.data.data.username);
    this.username = data.data.data.username;
    this.errno = data.data.errno;
    // const imgSrc = await this.$axios.get(`/api/getAvatar`);
    // this.imgSrc = imgSrc;
  },
  methods: {
    handleSelect: function(index) {
      this.$router.push(index);
    },
    btnPost: async function() {
      //由于节点已经挂载，需再次验证
      const data = await this.$axios.post(`http://localhost/api/user/getUser`);
      this.errno = data.data.errno;
      if (this.errno !== -1) {
        //已经登陆状态
        this.content = this.inputing;
        this.inputing = "";
        if (this.content === "") {
          this.$message.warning("说点什么吧！");
          return false;
        }
        this.commentList.push({
          src: require("../assets/me.png"),
          name: "alan",
          currTime: new Date().toLocaleDateString(),
          status: "潜水",
          zanNum: Math.floor(Math.random() * 10 + 1),
          caiNum: Math.floor(Math.random() * 10 + 2),
          content: this.content
        });
        return false;
      } else {
        console.log("你还没登录！", this.errno);
        this.login();
      }
    },
    login: function() {
      this.isLogin = true;
      this.dialogVisible = true;
    },
    close: function(data) {
      console.log("收到子组件信息：", data);
      this.dialogVisible = !data;
    },
    toRegister: function(data) {
      console.log("我要注册:" + data);
      this.isLogin = !data;
      this.isRegister = data;
      this.dialogVisible = data;
    },
    returnLogin: function(data) {
      this.isLogin = data;
      this.isRegister = !data;
      this.dialogVisible = data;
    },
    showInfo: function() {
      // this.drawer = true;
      console.log(111);
    },
    handleClose(done) {
      done();
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    changeName() {
      this.$prompt("请输入用户名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.username = value;
          this.$message({
            type: "success",
            message: "你已修改为: " + value
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  }
};
</script>

<style scoped>
@import "../assets/css/StudyBasis.css";
@import "../assets/css/Message.css";
</style>

