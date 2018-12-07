<template>
  <div class="spin-container">
    <Spin fix v-if="loading"></Spin>
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
    <div style="width:100%">
      <!-- <DatePicker @on-ok="querylog" @on-clear="clearDate" v-model="query.createdAt" type="datetimerange" :options="optionsDate" format="yyyy-MM-dd HH:mm" placeholder="时间范围" placement="bottom-end" style="width: 300px"></DatePicker> -->
      <!-- <Input @on-change="searchChange" v-model="query.text" placeholder="搜索所有字段" style="width: 300px"></Input> -->
      <!-- <Button @click="querylog" type="primary" icon="ios-search">Search</Button> -->
      <a href="http://www.xserver.top" target="blank" style="float:left">
        <Icon type="ios-water" />
        <b>XServer提供技术支持</b>
      </a>
    </div>
    <div style="width:100%;margin-top:40px">
      <Form ref="configForm" :model="formDynamic" inline>
        <Row v-for="(item, index) in formDynamic.configs" v-if="item.status" :key="index">
          <FormItem :prop="'configs.' + index + '.code'" :rules="ruleInline.code">
            <Input type="text" v-model="item.code" :readonly="item.readonly" placeholder="请输入配置编码code" style="width: 300px">
              <Icon type="md-key" slot="prepend"/>
            </Input>
          </FormItem>
          <FormItem :prop="'configs.' + index + '.config'" :rules="ruleInline.config">
            <Input type="text" v-model="item.config" placeholder="请输入配置内容config" style="width: 900px">
              <Icon type="md-settings" slot="prepend"/>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="error" @click="handleRemove(index)">删除</Button>
          </FormItem>
        </Row>
        <FormItem>
          <Row>
            <Button type="dashed" long @click="handleAdd" icon="plus-round">添加</Button>
          </Row>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('configForm')">保存</Button>
        </FormItem>
      </Form>
    </div>
    <div style="text-align:center;margin-top:10px">
      <Footer style="">2017-2018 &copy; CheneyXu</Footer>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { api } from "../../public/js/api";
export default {
  created() {
    this.queryconfig();
  },
  data() {
    return {
      loading: false,
      modalTip: false,
      tip: "您的网络不稳定/身份令牌已过期，请重新登录",
      formDynamic: {
        sid: localStorage.sid,
        configs: []
      },
      configItem() {
        return {
          code: "",
          config: "",
          status: 1,
          readonly: false
        };
      },
      ruleInline: {
        code: [
          {
            required: true,
            message: "配置编码code不能为空",
            trigger: "blur"
          },
          {
            type: "string",
            max: 1000,
            message: "配置项编码code不能超过1000字符",
            trigger: "blur"
          }
        ],
        config: [
          {
            required: true,
            message: "配置内容config不能为空",
            trigger: "blur"
          },
          {
            type: "string",
            max: 1000,
            message: "配置项内容config不能超过1000字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleAdd() {
      this.formDynamic.configs.push(this.configItem());
    },
    handleRemove(index) {
      let self = this;
      self.formDynamic.configs[index].status = 0;
      if (self.formDynamic.configs[index].code) {
        self.loading = true;
        axios
          .post(
            api.delconfig,
            { code: self.formDynamic.configs[index].code },
            {
              headers: { token: localStorage.token }
            }
          )
          .then(function(res) {
            self.loading = false;
            if (res.data.err) {
              alert(res.data.msg);
            }
          });
      }
    },
    handleSubmit(name) {
      let self = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          self.loading = true;
          // this.$Message.success("Success!");
          const configs = this.formDynamic.configs.filter(item => {
            return item.status != 0;
          });
          this.formDynamic.configs = configs;
          axios
            .post(api.upconfig, this.formDynamic, {
              headers: { token: localStorage.token }
            })
            .then(function(res) {
              self.loading = false;
              if (res.data.err) {
                alert(res.data.msg);
              } else {
                self.queryconfig();
              }
            });
        } else {
          // this.$Message.error("Fail!");
        }
      });
    },
    queryconfig(startKey) {
      let self = this;
      self.loading = true;
      self.formDynamic.configs = [];
      let postdata = {};
      axios
        .post(api.queryconfig, postdata, {
          headers: { token: localStorage.token }
        })
        .then(function(res) {
          self.loading = false;
          if (res.data && res.data.Items && res.data.Items.length > 0) {
            for (let item of res.data.Items) {
              item.status = 1;
              item.readonly = true;
              self.formDynamic.configs.push(item);
            }
          } else {
            self.formDynamic.configs.push(self.configItem());
          }
        })
        .catch(function(err) {
          console.info(err);
          self.loading = false;
          self.modalTip = true;
        });
    },
    // 重新登录
    reLogin() {
      localStorage.clear();
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style>
.spin-container {
  display: inline-block;
  width: 100%;
  height: 100%;
  position: relative;
  /* border: 1px solid #eee; */
  padding: 10px;
}
</style>

