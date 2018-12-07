<template>
  <div class="index">
    <Modal v-model="modalReg" width="360">
      <p slot="header" style="color:green;text-align:center">
        <Icon type="md-person-add" />
        <span>注册</span>
      </p>
      <div style="text-align:center">
        <Input v-model="userdata.username" @on-change="inputChange" type="email" size="large" placeholder="注册邮箱" style="width: 300px"/>
        <Input v-model="userdata.password" @on-change="inputChange" type="password" size="large" placeholder="注册密码6-16位" style="width: 300px;margin-top:10px"/>
      </div>
      <div id="vaptcha_container" style="width:100%;height:50px;padding-top:10px;padding-left:14px;padding-right:14px;">
        <div class="vaptcha-init-main">
            <div class="vaptcha-init-loading">
              <img src="https://cdn.vaptcha.com/vaptcha-loading.gif"/></a>
              <span class="vaptcha-text">VAPTCHA启动中...</span>
            </div>
        </div>
      </div>
      <div style="text-align:center;padding-left:14px;padding-right:14px;">
        <Input v-model="userdata.emailcode" @on-change="inputChange" type="text" size="large" placeholder="输入收到的邮件验证码" style="width: 300px;margin-top:10px">
          <span slot="append" @click="sendEmail">{{tipEmail}}</span>
        </Input>
      </div>
      <div style="text-align:center;margin-top:10px">
        <b><font color="red">{{tip}}</font></b>
      </div>
      <div slot="footer">
        <Button type="success" size="large" long :loading="loadingModal" @click="reg">注册</Button>
      </div>
    </Modal>
    <Modal v-model="modalAuth" width="360">
      <p slot="header" style="color:#57c5f7;text-align:center">
        <Icon type="md-cloud" />
        <span>已注册请登录</span>
      </p>
      <div style="text-align:center">
        <Input v-model="userdata.username" @on-change="inputChange" type="email" size="large" placeholder="邮箱" style="width: 300px"/>
        <Input v-model="userdata.password" @on-change="inputChange" type="password" size="large" placeholder="密码6-16位" style="width: 300px;margin-top:10px"/>
      </div>
      <div style="text-align:center;margin-top:10px">
      <b><font color="red">{{tip}}</font></b>
      </div>
      <div slot="footer">
        <Button type="info" size="large" long :loading="loadingModal" @click="auth">登录</Button>
      </div>
    </Modal>
    <Header>
      <Menu mode="horizontal" theme="dark" active-name="1">
        <!-- <div class="layout-logo"></div> -->
        <div class="layout-nav" style="float:right">
          <MenuItem name="1">
            <div  @click="showRegModal">
           <Icon type="md-person-add" />
            注册
            </div>
          </MenuItem>
          <MenuItem name="2">
            <div  @click="showAuthModal">
            <Icon type="md-cloud" />
            登录
            </div>
          </MenuItem>
        </div>
      </Menu>
    </Header>
    <Icon type="md-cloud-upload" size="150"/>
    <!-- <img src="../assets/logo.png"> -->
    <h1>UPServer——云端应用开发服务</h1>
    <br/>
    <h2>前言：<b>日志管理</b>,<b>功能配置</b>等业务系统中相对独立部分，由独立服务管理，则可以更专注于核心业务逻辑实现</h2>
    <br/>
    <h3>upserver是私密独立的应用开发服务，采用标准的RESTful接口数据交互，提供可视化控制台管理</h3>
    <br/>
    <Row type="flex" justify="space-around">
            <Col span="5">
              <Poptip trigger="hover" title="使用说明" placement="right-bottom">
                <div slot="content">
                  <div style="text-align:center">
                    <pre><b>POST</b> <font color="#CC3333">https://dl57vasdud645.cloudfront.net/uplog</font> <i><font color="grey">通过此URL上传日志</font></i></pre>
                    <pre><b>BODY</b> <font color="green">{"sid":"服务标识","log":"日志内容", ...}</font> <i><font color="grey">application/json</font></i></pre>
                    <pre><i><font color="grey">sid是由平台提供的服务标识，log为必须的日志内容，其余可拓展任意字段</font></i></pre>
                  </div>
                </div>
                <Card>
                    <div style="text-align:center" @click="showAuthModal">
                        <!-- <img src="../../images/logo.png"> -->
                        <router-link to="">
                            <Icon type="ios-list" size="100"/>
                        </router-link>
                        <h2>uplog</h2>
                        <h3>云日志服务</h3>
                        <p>通过标准RESTful接口上传日志，提供可视化控制台进行日志管理</p>
                    </div>
                </Card>
              </Poptip>
            </Col>
            <Col span="5">
              <Poptip trigger="hover" title="使用说明" placement="right-bottom">
                <div slot="content">
                  <div style="text-align:center">
                    <pre><b>POST</b> <font color="#CC3333">https://dl57vasdud645.cloudfront.net/getconfig</font> <i><font color="grey">通过此URL获取配置项</font></i></pre>
                    <pre><b>BODY</b> <font color="green">{"sid":"服务标识","code":"配置项编码"}</font> <i><font color="grey">application/json</font></i></pre>
                    <pre><i><font color="grey">sid是由平台提供的服务标识，code为唯一配置项编码(空则返回所有配置)</font></i></pre>
                  </div>
                </div>
                <Card>
                  <div style="text-align:center" @click="showAuthModal">
                    <!-- <img src="../../images/logo.png"> -->
                    <router-link to="">
                        <Icon type="md-settings" size="100"/>
                    </router-link>
                    <h2>upconfig</h2>
                    <h3>云配置管理</h3>
                    <p>提供控制台可视化新增/编辑配置项，通过标准的RESTful接口获取</p>
                  </div>
                </Card>
              </Poptip>
            </Col>
            <Col span="5">
            <Card>
                <div style="text-align:center">
                    <!-- <img src="../../images/logo.png"> -->
                    <router-link to="/layout/devkoa">
                        <Icon type="md-more" size="100"/>
                    </router-link>
                    <h2>more</h2>
                    <h3>更多服务</h3>
                    <p>持续构建...</p>
                </div>
            </Card>
            </Col>
        </Row>
        <Row>
            <h1 style="padding:10px">控制台展示</h1>
            <img src="http://img.xserver.top/upserver_demo_1.png" style="width:85%"/>
        </Row>
    <br/>
    <br/>
    <ul>
        <li><a href="https://github.com/cheneyweb" target="_blank">Thanks</a></li>
        <li><a href="https://github.com/cheneyweb" target="_blank">Github</a></li>
        <li><a href="https://github.com/cheneyweb" target="_blank">Support</a></li>
        <li><a href="mailto:457299596@qq.com" target="_blank">Email</a></li>
        <br>
        <li><a href="https://github.com/cheneyweb" target="_blank">Donate</a></li>
    </ul>
    <Footer class="layout-footer-center">2017-2018 &copy; CheneyXu</Footer>
  </div>
</template>
<script>
import axios from "axios";
import { api } from "../../public/js/api.js";
export default {
  name: "index",
  created() {
    if (localStorage.token) {
      this.$router.push({
        path: "/layout/log"
      });
    } else {
      this.initVaptcha();
    }
  },
  //   mounted() {
  //     document.getElementById("asciinema_player").style.display = "inline";
  //   },
  data() {
    return {
      modalReg: false, // 注册弹窗
      modalAuth: false, // 登录弹窗
      loadingModal: false, // 是否加载
      tip: "", // 弹窗提示语
      tipEmail: "发送验证邮件",
      waitSend: 0, // 重发邮件时间间隔
      userdata: {
        username: "", // 邮箱帐号
        password: "", // 密码
        emailcode: "", // 邮件验证码
        token: "", // 人机验证口令
        challenge: "" // 人机验证口令
      },
      vaptchaObj: null // 验证模块
    };
  },
  methods: {
    showRegModal() {
      this.modalReg = true;
      this.clearData();
    },
    showAuthModal() {
      this.modalAuth = true;
      this.clearData();
    },
    initVaptcha() {
      let self = this;
      axios.post(api.getVaptcha, {}).then(function(r) {
        const options = {
          vid: r.data.vid,
          challenge: r.data.challenge,
          type: "float", //验证码类型,string,默认float,可选择float,popup,embed,
          checkingAnimation: "display", //是否显示智能检测动画，"hide"则为隐藏
          outage: api.getDownTime,
          container: "#vaptcha_container",
          success: function(token, challenge) {
            //当验证成功时执行回调,function,参数token为string,必选
            self.userdata.token = token;
            self.userdata.challenge = challenge;
            self.tip = "";
          },
          fail: function() {
            self.clearData("人机验证失败");
          }
        };
        //vaptcha对象初始化
        window.vaptcha(options, function(obj) {
          self.vaptchaObj = obj;
          self.vaptchaObj.init();
        });
      });
    },
    sendEmail() {
      let self = this;
      if (!self.userdata.token) {
        self.clearData("请进行人机验证");
        return;
      }
      if (!self.checkInparam()) {
        return;
      }
      if (self.waitSend == 0) {
        self.tipEmail = "已发送(60)";
        self.waitSend = 60;
        let loop = setInterval(function() {
          self.waitSend--;
          self.tipEmail = "已发送(" + self.waitSend + ")";
          if (self.waitSend == 0) {
            clearInterval(loop);
            self.tipEmail = "发送验证邮件";
          }
        }, 1000);
        axios
          .post(api.sendemail, {
            type: "captcha",
            username: self.userdata.username
          })
          .then(function(res) {
            if (res.data.err) {
              self.clearData(res.data.msg);
            }
          })
          .catch(function(err) {
            console.error(err);
            self.clearData();
          });
      }
    },
    reg() {
      let self = this;
      if (!self.checkInparam("reg")) {
        return;
      }
      self.loadingModal = true;
      axios
        .post(api.reg, self.userdata)
        .then(function(res) {
          self.loadingModal = false;
          if (res.data.err && typeof res.data.msg == "array") {
            self.clearData("入参不合法");
          } else if (res.data.err) {
            self.clearData(res.data.msg);
          } else {
            self.modalReg = false;
            self.modalAuth = true;
            self.clearData();
          }
        })
        .catch(function(err) {
          console.error(err);
          self.loadingModal = false;
          self.clearData();
        });
    },
    auth() {
      let self = this;
      if (!self.checkInparam()) {
        return;
      }
      self.loadingModal = true;
      axios
        .post(api.auth, self.userdata)
        .then(function(res) {
          self.loadingModal = false;
          if (res.data.err) {
            self.clearData(res.data.msg);
          } else {
            localStorage.token = res.data.user.tokenSign;
            localStorage.username = res.data.user.username;
            localStorage.sid = res.data.user.sid;
            self.clearData();
            self.$router.push({
              path: "/layout/log"
            });
          }
        })
        .catch(function(err) {
          console.error(err);
          self.loadingModal = false;
          self.clearData();
        });
    },
    inputChange() {
      this.tip = "";
    },
    clearData(tip) {
      this.tip = tip || "";
      this.userdata.token = "";
      this.userdata.challenge = "";
      this.initVaptcha();
    },
    checkInparam(type) {
      const emailReg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
      if (!this.userdata.username) {
        this.clearData("请输入注册邮箱");
        return false;
      }
      if (this.userdata.username.length > 50) {
        this.clearData("邮箱长度最大50位字符");
        return false;
      }
      if (!emailReg.test(this.userdata.username)) {
        this.clearData("邮箱格式不正确");
        return false;
      }
      if (!this.userdata.password) {
        this.clearData("请输入注册密码");
        return false;
      }
      if (
        this.userdata.password.length < 6 ||
        this.userdata.password.length > 16
      ) {
        this.clearData("密码长度为6-16位");
        return false;
      }
      if (type == "reg" && !this.userdata.token) {
        this.clearData("请进行人机验证");
        return false;
      }
      if (type == "reg" && !this.userdata.emailcode) {
        this.clearData("请输入邮箱验证码");
        return false;
      }
      if (type == "reg" && this.userdata.emailcode.length != 4) {
        this.clearData("邮箱验证码不正确");
        return false;
      }
      return true;
    }
  }
};
</script>
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.index {
  text-align: center;
}

.layout-footer-center {
  margin-top: 10px;
}

/*验证码样式*/
.vaptcha-init-main {
  display: table;
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
}
.vaptcha-init-loading {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.vaptcha-init-loading > a {
  display: inline-block;
  width: 18px;
  height: 18px;
}
.vaptcha-init-loading > a img {
  vertical-align: middle;
}
/* .vaptcha-init-loading .vaptcha-text {
  font-family: sans-serif;
  font-size: 12px;
  color: #cccccc;
  vertical-align: middle;
} */
</style>
