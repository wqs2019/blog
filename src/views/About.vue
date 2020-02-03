<template>
  <el-container>
    <el-header>
      <nav-header />
    </el-header>
    <el-container>
      <el-aside width="300px">
        <el-menu :default-active="($route.path)[1]" @select="handleSelect">
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
              <el-breadcrumb-item>关于我</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="image">
              <img src="../assets/me.png" alt />
            </div>
          </el-col>
          <el-col :span="12">
            <div class="person-detail">
              <p>
                <strong>姓名：</strong>
                {{data.name}}
              </p>
              <p>
                <strong>地区：</strong>
                {{data.area}}
              </p>
              <p>
                <strong>职业：</strong>
                {{data.work}}
              </p>
              <p>
                <strong>个人说明：</strong>
                {{data.description}}
              </p>
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
      data: {
        name: "伍庆时",
        area: "广东",
        work: "Web前端工程师",
        description: `人生就是得与失的过程，而我，却在短短的一年内得到了太多，友情、爱情、知识，最重要的是懂得了如何做人，如何去面对职场。
                没有钱、没有经验、没有阅历、没有社会关系，这些都不可怕。没有钱，可以通过辛勤劳动去赚；没有经验，可以通过实践操作去总结；没有阅历，可以一步一步去积累；没有社会关系，可以一点一点去编织。但是，没有梦想、没有思路才是最可怕的，才让人感到恐惧，很想逃避！周而复始，恶性循环！
                什么是梦想？每天都冒出很多念头，那些不死的才叫做梦想。抽出时间去学习，凡事从小做起，不怕单调和重复，长期的积累坚持，想不成功，也难。
                理想是什么？它不是口上说的计划，也不是敷衍的借口，它是自己的心，理想的最终汇集地，是幸福，为了自己有了理想，为了恋人有了理想，为了家人有了理想，有了理想才有梦，梦想与理想，一字之差千里之遥。fighting！！！！`
      }
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
.image img{
  width: 100%;
}
</style>

