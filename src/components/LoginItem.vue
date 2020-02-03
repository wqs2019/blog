<template>
  <el-dialog title :visible.sync="dialogVisible" width="30%" :before-close="close">
    <el-row class="split-hr">
      <span class="split-txt">正在使用云评论评论</span>
    </el-row>
    <el-row class="type">邮箱登录</el-row>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <el-button type="primary" v-on:click="submitForm('ruleForm')">登录云评论</el-button>
    </el-form>

    <el-row class="register-wrap">
      <a class="phone-register" @click="isRegister">前往注册</a>
      <a class="phone-register">忘记密码</a>
    </el-row>
    <el-row>
      <ul class="login-group">
        <li class="weibo"></li>
        <li class="qq"></li>
        <li class="weixin"></li>
      </ul>
    </el-row>
    <el-row class="login-instruction">登录过的用户请沿用之前的登录方式</el-row>
  </el-dialog>
</template>

<script>
export default {
  props: ["dialogVisible"],
  data() {
    return {
      ruleForm: {
        password: "",
        username: ""
      },
      rules: {
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    close: function() {
      this.$emit("close", this.$props.dialogVisible);
    },
    isRegister: function() {
      this.$emit("toRegister", true);
    },
    async submitForm(formName) {
      await this.$refs[formName].validate(valid => {
        if (valid) {
          const data = this.$axios
            .post(`http://localhost/api/user/login`, this.ruleForm)
            .then(res => {
              this.$message.success('登录成功！');
              this.close()
              console.log(res);
            });
        } else {
          this.$message.error("登陆失败，请重新输入！");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
@import "../assets/css/login.css";
</style>