<template>
    <div class="spin-container">
        <Spin fix v-if="loadding"></Spin>
        <Modal v-model="modalTip" width="360">
            <p slot="header" style="color:red;text-align:center">
                <Icon type="md-person-add" />
                <span>温馨提示</span>
            </p>
            <div style="text-align:center;margin-top:10px">
              <b><font>{{tip}}</font></b>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long @click="reLogin">重新登录</Button>
            </div>
        </Modal>
        <Row type="flex" justify="space-around" style="margin-top:10px">
            <div style="text-align:left;width:100%">
              <Input v-model="sid" readonly size="large" style="width:300px"/>
              <Button @click="updatesid" type="primary" icon="ios-search">更换服务标识</Button>
              <Button @click="reLogin" type="error" icon="ios-search" style="float:right">退出登录</Button>
            </div>
        </Row>

      <Collapse v-model="doc" style="margin-top:10px">
        <Panel name="1">
            <b>uplog文档</b>
            <p slot="content">
              <Card>
              <div style="text-align:center">
                <pre><b>POST</b> <font color="#CC3333">https://dl57vasdud645.cloudfront.net/uplog</font> <i><font color="grey">通过此URL上传日志</font></i></pre>
                <pre><b>BODY</b> <font color="green">{"sid":"{{sid}}","log":"日志内容", ...}</font> <i><font color="grey">application/json</font></i></pre>
                <pre><i><font color="grey">sid是由平台提供的服务标识，log为必须的日志内容，其余可拓展任意字段</font></i></pre>
              </div>
              </Card>
              <Card style="text-align:center;margin-top:10px">
                  <div>
                      <pre><b>上传的日志会通过【sid】服务标识存储进入您的【私密独立空间】，所有日志上传后都会生成默认创建时间戳</b><font color="grey">【createdAt】</font></pre>
                  </div>
                  <div>
                      <pre><b>UPLOG没有字段属性限制，除了<font color="grey">【sid】</font>和<font color="grey">【log】</font>，您还可以上传任意拓展字段，如日志管理系统中常见的level和creater等</b></pre>
                  </div>
              </Card>
            </p>
        </Panel>
        <Panel name="2">
            <b>upconfig文档</b>
            <p slot="content"><Card style="margin-top:10px"s>
              <div style="text-align:center">
                <pre><b>POST</b> <font color="#CC3333">https://dl57vasdud645.cloudfront.net/getconfig</font> <i><font color="grey">通过此URL获取配置项</font></i></pre>
                <pre><b>BODY</b> <font color="green">{"sid":"{{sid}}","code":"配置编码"}</font> <i><font color="grey">application/json</font></i></pre>
                <pre><i><font color="grey">sid是由平台提供的服务标识，code为唯一配置项编码(空则返回所有配置)</font></i></pre>
              </div>
              </Card>
              <Card style="text-align:center;margin-top:10px">
                  <div>
                      <pre><b>通过【sid】服务标识可以获取您的【私密配置项】，如果【code】值为空则获取所有配置项</b></pre>
                  </div>
              </Card>
            </p>
        </Panel>
      </Collapse>

        <div style="text-align:center;margin-top:10px">
          <Footer style="">2017-2018 &copy; CheneyXu</Footer>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { api } from "../../public/js/api.js";
export default {
  data() {
    return {
      doc: 0,
      sid: localStorage.sid,
      loadding: false,
      modalTip: false,
      tip: "您的网络不稳定/身份令牌已过期，请重新登录"
    };
  },
  methods: {
    updatesid() {
      let self = this;
      self.loadding = true;
      axios
        .get(api.updatesid, { headers: { token: localStorage.token } })
        .then(function(res) {
          self.loadding = false;
          localStorage.sid = res.data.sid;
          self.sid = res.data.sid;
        })
        .catch(function(err) {
          self.loadding = false;
          // if (err.response.status == '401') {
          self.modalTip = true;
          // } else {
          //   alert(err.message);
          // }
        });
    },
    reLogin() {
      localStorage.clear();
      this.$router.push({ path: "/" });
    }
  }
};
</script>
<style scoped>
.time {
  font-size: 16px;
  font-weight: bold;
}

.content {
  font-family: "Helvetica Neue";
  font-size: 14px;
  padding-left: 5px;
  color: #657180;
}

.normalfont {
  font-family: "Helvetica Neue";
  font-size: 15px;
}

.spin-container {
  display: inline-block;
  width: 100%;
  height: 100%;
  position: relative;
  /* border: 1px solid #eee; */
  padding: 10px;
}
</style>
