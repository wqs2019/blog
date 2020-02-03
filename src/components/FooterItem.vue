<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="12" :offset="4">
        <el-row>
          <div class="footer-link">
            <ul>
              <li>联系我们</li>
              <li>意见反馈</li>
              <li>友情链接</li>
              <li>帮助中心</li>
            </ul>
          </div>
        </el-row>
        <el-row>
          <el-col :span="20" >
            <div class="footer-copy">© 2019 imooc.com 京ICP备 12003892号-11 北京奥鹏文化传媒有限公司</div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="2">
        <div class="footer-tip">
          <img src="../assets/weixin.svg" alt />
          <p>微信</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
.el-row{
    margin: 0;
}
.container {
  background: rgb(65, 65, 65);
}
.footer-link ul {
  display: flex;
  flex-direction: row;
  justify-content: baseline;
}
.footer-link ul li {
  padding-right: 20px;
  line-height: 50px;
  height: 50px;
  font-size: 14px;
  color: #aaa;
  cursor: pointer;
}
.footer-link ul li:hover {
  color: #fff;
}
.footer-copy {
  font-size: 12px;
  color: #aaa;
  line-height: 40px;
}
.footer-tip {
  text-align: center;
  margin-top: 20px;
}
.footer-tip img {
  width: 40px;
  height: 40px;
  margin: 0 auto;
}
.footer-tip p {
  color: #aaa;
  font-size: 14px;
  text-align: center;
  margin: 0 auto;
}
</style>