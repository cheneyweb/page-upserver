// const protocol = 'http://'
// const domain = 'localhost:3000'
const protocol = 'https://'
const domain = 'dl57vasdud645.cloudfront.net'
// const domain = 'negqs31pv3.execute-api.ap-southeast-1.amazonaws.com/development'
export const api = {
    reg: `${protocol}${domain}/reg`,                        // POST 用户注册
    auth: `${protocol}${domain}/auth`,                      // POST 用户登录
    sendemail: `${protocol}${domain}/sendemail`,            // POST 邮箱验证
    updatesid: `${protocol}${domain}/updatesid`,            // GET  更新sid
    querylog: `${protocol}${domain}/querylog`,              // POST 日志查询
    getVaptcha: `${protocol}${domain}/vaptcha/getVaptcha`,  // POST 人机验证
    getDownTime: `${protocol}${domain}/vaptcha/getDownTime`,// GET  宕机模式
    queryconfig: `${protocol}${domain}/queryconfig`,        // POST 配置查询
    upconfig: `${protocol}${domain}/upconfig`,              // POST 上传配置
    delconfig: `${protocol}${domain}/delconfig`,            // POST 删除配置
}
