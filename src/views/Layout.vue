<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-con {
  height: 100%;
  width: 100%;
}
.layout-content {
  /* min-height: 1000px; */
  overflow: hidden;
  /* background: #fff; */
  /* border-radius: 4px; */
}
.menu-item b {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu b {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
<template>
  <div class="layout">
    <Layout :style="{minHeight: '100vh'}">
      <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}" collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses">
          <MenuItem name="1-1">
            <router-link to="/layout/log">
              <Icon type="ios-list"/>
              <b>日志服务</b>
            </router-link>
          </MenuItem>
          <MenuItem name="1-2">
            <router-link to="/layout/config">
              <Icon type="md-settings"/>
              <b>配置服务</b>
            </router-link>
          </MenuItem>
          <MenuItem name="1-3">
            <router-link to="/layout/account">
              <Icon type="md-person"/>
              <b>帐号管理</b>
            </router-link>
          </MenuItem>
          <MenuItem name="1-4">
            <router-link to="/layout/about">
              <Icon type="ios-chatboxes-outline"/>
              <b>关于我们</b>
            </router-link>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout :style="contentStyleCompute">
        <div>
          <router-view></router-view>
        </div>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapsed: true
    };
  },
  computed: {
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
    contentStyleCompute: function() {
      return this.isCollapsed
        ? { marginLeft: "78px" }
        : { marginLeft: "200px" };
    }
  }
};
</script>
