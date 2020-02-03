<template>
  <el-dialog title :visible.sync="dialogVisible" width="30%" :before-close="close">
    <el-row class="split-hr">
      <span class="split-txt">正在使用云评论评论</span>
    </el-row>
    <el-row class="type">邮箱注册</el-row>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" placeholder="邮箱"></el-input>
      </el-form-item>
      <!-- <el-row :gutter="5">
        <el-col :span="17">
          <el-input v-model="code" placeholder="输入验证码"></el-input>
        </el-col>
        <el-col :span="7">
          <el-button>获取验证码</el-button>
        </el-col>
      </el-row>-->
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="copassword">
        <el-input v-model="ruleForm.copassword" placeholder="确认密码" type="password"></el-input>
      </el-form-item>
      <el-button type="primary" v-on:click="submitForm('ruleForm')">注册云评论</el-button>
    </el-form>
    <el-row class="register-wrap">
      <a class="return-login" @click="returnLogin">返回登陆</a>
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.copassword !== "") {
          this.$refs.ruleForm.validateField("validatePass2");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        username: "",
        copassword: ""
        // code: ""
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        copassword: [{ validator: validatePass2, trigger: "blur" }],
        username: [
          { required: true, message: "邮箱不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    close: function() {
      this.$emit("close", this.$props.dialogVisible);
    },
    returnLogin: function() {
      this.$emit("returnLogin", true);
    },
    async submitForm(formName) {
      await this.$refs[formName].validate(valid => {
        if (valid) {
          const data = this.$axios
            .post(`http://localhost/api/user/register`, this.ruleForm)
            .then(res => {
              console.log(res);
              this.$message.success('注册成功！');
              this.close()
            });
        } else {
          this.$message.error('注册失败，请重新输入！');
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