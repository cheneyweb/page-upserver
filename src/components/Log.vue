<template>
  <div style="padding:10px;">
      <Modal v-model="modalTip" width="360">
          <p slot="header" style="color:red;text-align:center">
              <Icon type="md-person-add" />
              <span>温馨提示</span>
          </p>
          <div style="text-align:center;">
            <b><font>{{tip}}</font></b>
          </div>
          <div slot="footer">
              <Button type="error" size="large" long @click="reLogin">重新登录</Button>
          </div>
      </Modal>
      <div style="text-align:right">
        <DatePicker @on-ok="querylog" @on-clear="clearDate" v-model="query.createdAt" type="datetimerange" :options="optionsDate" format="yyyy-MM-dd HH:mm" placeholder="时间范围" placement="bottom-end" style="width: 300px"></DatePicker>
        <Input @on-change="searchChange" v-model="query.text" placeholder="搜索所有字段" style="width: 300px"/>
        <Button @click="querylog" type="primary" icon="ios-search">Search</Button>
        <a href="http://www.xserver.top" target="blank" style="float:left">
          <Icon type="ios-water"/>
          <b>XServer提供技术支持</b>
        </a>
        <Row>
        <CheckboxGroup @on-change="initLogcolumn" v-model="tableColumnsChecked" style="float:left">
          <Checkbox v-for="item in tableColumnsCheckArr" :label="item" :key="item"></Checkbox>
        </CheckboxGroup>
        </Row>
        <Table border stripe size="small" :data="logdata" :columns="logcolumn" :loading="loadingTable" style="margin-top:10px" no-data-text="当前时间范围内无数据，检查您的时间范围查询是否正确"></Table>
      </div>
      <Row v-show="showTip" type="flex" justify="space-around" style="margin-top:10px">
          <div span="20" style="width:100%">
            <Card>
                <div style="text-align:center">
                    <pre><b>POST</b> <font color="#CC3333">https://dl57vasdud645.cloudfront.net/uplog</font> <i><font color="grey">通过此URL上传日志</font></i></pre>
                    <pre><b>BODY</b> <font color="green">{"sid":"{{sid}}","log":"日志内容", ...}</font> <i><font color="grey">application/json</font></i></pre>
                    <pre><i><font color="grey">sid是由平台提供的服务标识，log为必须的日志内容，其余可拓展任意字段</font></i></pre>
                </div>
            </Card>
          </div>
      </Row>
      <Button @click="loadmore" long>加载更多</Button>
      <div style="text-align:center;margin-top:10px">
        <Footer style="">2017-2018 &copy; CheneyXu</Footer>
      </div>
  </div>
</template>
<script>
import axios from "axios";
import { api } from "../../public/js/api";
export default {
  data() {
    return {
      optionsDate: {
        shortcuts: [
          {
            text: "今天",
            value() {
              let date = new Date(); //获取当前Date对象
              date.setHours(0);
              date.setMinutes(0);
              date.setSeconds(0);
              date.setMilliseconds(0);
              let todayEnd = new Date(); //获取当前Date对象
              todayEnd.setHours(0);
              todayEnd.setMinutes(0);
              todayEnd.setSeconds(0);
              todayEnd.setMilliseconds(0);
              todayEnd.setTime(todayEnd.getTime() + 3600 * 1000 * 24 - 1);
              return [date, todayEnd];
            }
          },
          {
            text: "昨天",
            value() {
              var date = new Date(); //获取当前Date对象
              date.setHours(0);
              date.setMinutes(0);
              date.setSeconds(0);
              date.setMilliseconds(0);
              var date2 = new Date(); //获取当前Date对象
              date2.setHours(0);
              date2.setMinutes(0);
              date2.setSeconds(0);
              date2.setMilliseconds(0);
              date2.setTime(date.getTime() - 3600 * 1000 * 24);
              return [new Date(date2.getTime()), new Date(date.getTime() - 1)];
            }
          },
          {
            text: "一周",
            value() {
              const date = new Date(); //获取当前Date对象
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              let todayEnd = new Date(); //获取当前Date对象
              todayEnd.setHours(0);
              todayEnd.setMinutes(0);
              todayEnd.setSeconds(0);
              todayEnd.setMilliseconds(0);
              todayEnd.setTime(todayEnd.getTime() + 3600 * 1000 * 24 - 1);
              return [date, todayEnd];
            }
          }
        ]
      },
      query: {
        createdAt: [
          new Date(new Date().getTime() - 3600 * 1000 * 24),
          new Date(
            new Date(new Date().toLocaleDateString()).getTime() +
              24 * 60 * 60 * 1000 -
              1
          )
        ],
        text: ""
      },
      startKey: null,
      logcolumn: [],
      logdata: [],
      loadingTable: false,
      loadingModal: false,
      modalTip: false,
      tip: "您的网络不稳定/身份令牌已过期，请重新登录",
      showTip: false,
      sid: localStorage.sid,
      tableColumnsCheckArr: [],
      tableColumnsChecked: [] // 已勾选的列
    };
  },
  created() {
    this.querylog();
  },
  methods: {
    // 日志查询
    querylog(startKey) {
      let self = this;
      self.loadingTable = true;
      if (!self.isStartKey(startKey)) {
        self.logdata = [];
      }
      if (self.query.createdAt.length != 2) {
        let todayEnd = new Date(); //获取当前Date对象
        todayEnd.setHours(0);
        todayEnd.setMinutes(0);
        todayEnd.setSeconds(0);
        todayEnd.setMilliseconds(0);
        todayEnd.setTime(todayEnd.getTime() + 3600 * 1000 * 24 - 1);
        self.query.createdAt = [
          new Date(new Date().getTime() - 3600 * 1000 * 24),
          todayEnd
        ];
      }
      let postdata = {
        username: localStorage.username,
        createdAt: [
          self.query.createdAt[0].getTime(),
          self.query.createdAt[1].getTime()
        ]
      };
      if (self.isStartKey(startKey)) {
        postdata.startKey = startKey;
      }
      axios
        .post(api.querylog, postdata, {
          headers: { token: localStorage.token }
        })
        .then(function(res) {
          self.loadingTable = false;
          // 判断是否累加
          if (!self.isStartKey(startKey)) {
            self.logdata = res.data.Items;
          } else {
            for (let item of res.data.Items) {
              self.logdata.push(item);
            }
          }
          // 更新起始键
          if (self.isStartKey(res.data.LastEvaluatedKey)) {
            self.startKey = res.data.LastEvaluatedKey;
          }
          // 根据返回数据初始化表头
          if (self.logdata.length == 0) {
            self.showTip = true;
          } else {
            self.showTip = false;
            self.initColChecked(self.logdata[0]);
            self.initLogcolumn();
          }
          if (self.logdata.length > 0 && self.query.text) {
            // 进一步异步搜索
            self.search(self.logdata, self.query.text).then(function(res) {
              self.logdata = res;
              self.initColChecked(self.logdata[0]);
              self.initLogcolumn();
            });
          }
        })
        .catch(function(err) {
          self.loadingTable = false;
          // if (err.message.indexOf("401") != "-1") {
          self.modalTip = true;
          // } else {
          // alert(err.message);
          // }
        });
    },
    // 重新登录
    reLogin() {
      localStorage.clear();
      this.$router.push({ path: "/" });
    },
    // 清空日期
    clearDate() {
      this.query.createdAt = [];
      this.querylog();
    },
    // 清空搜索
    searchChange() {
      if (!this.query.text) {
        this.querylog();
      }
    },
    // 模糊搜索
    search(data, text) {
      return new Promise(function(resolve, reject) {
        let res = [];
        for (let item of data) {
          for (let key in item) {
            if (
              key == "sid" ||
              key == "createdAt" ||
              key == "upadtedAt" ||
              key == "username"
            ) {
              continue;
            }
            if (item[key].toString().indexOf(text) != "-1") {
              res.push(item);
              break;
            }
          }
        }
        resolve(res);
      });
    },
    // 初始勾选项
    initColChecked(data) {
      if (data) {
        this.tableColumnsChecked = [];
        this.tableColumnsCheckArr = [];
        for (let key in data) {
          if (
            key != "sid" &&
            key != "updatedAt" &&
            key != "username" &&
            key != "createdAt" &&
            key != "log"
          ) {
            this.tableColumnsCheckArr.push(key);
          }
          if (key != "sid" && key != "updatedAt" && key != "username") {
            this.tableColumnsChecked.push(key);
          }
        }
      }
    },
    // 初始表头
    initLogcolumn() {
      let colArr = [];
      if (this.logdata.length > 0) {
        for (let key in this.logdata[0]) {
          if (key == "sid" || key == "updatedAt" || key == "username") {
            continue;
          }
          let col = {
            title: key,
            key: key,
            sortable: true,
            align: "center"
          };
          if (key == "createdAt") {
            // col["fixed"] = "left";
            col["width"] = 125;
          }
          if (key == "createdDate") {
            // col["fixed"] = "right";
            col["width"] = 125;
          }
          if (key == "createdTime") {
            // col["fixed"] = "right";
            col["width"] = 125;
          }
          if (key == "log") {
            col["render"] = (h, params) => {
              return h(
                "Poptip",
                {
                  props: {
                    // trigger: "hover",
                    // content: this.logdata[params.index].log,
                    placement: "bottom"
                  }
                },
                [
                  h(
                    "div",
                    {
                      slot: "content"
                    },
                    [
                      h("vue-json-pretty", {
                        props: {
                          data: this.isJSON(this.logdata[params.index].log)
                        }
                      })
                    ]
                  ),
                  h("b", this.logdata[params.index].log)
                ]
              );
              // return h("b", this.logdata[params.index].log);
            };
            col["className"] = "logcol";
            col["align"] = "left";
          }
          // 根据勾选项显示列
          for (let item of this.tableColumnsChecked) {
            if (item == col.key) {
              colArr.push(col);
            }
          }
        }
      }
      this.logcolumn = colArr;
    },
    loadmore() {
      this.querylog(this.startKey);
    },
    isStartKey(startKey) {
      if (startKey && startKey.username && startKey.createdAt) {
        return true;
      }
      return false;
    },
    isJSON(str) {
      try {
        return JSON.parse(str);
      } catch (e) {
        return str;
      }
    }
  }
};
</script>

<<style>
.logcol{
  padding-top:5px;
  padding-bottom:5px;
}
</style>
