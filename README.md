#page-upserver
[![Build Status](https://travis-ci.com/cheneyweb/page-upserver.svg?branch=master)](https://travis-ci.com/cheneyweb/page-upserver)

##构建优化
1、启用DllPlugin和DllReferencePlugin预编译库文件
1.1、build文件夹下增加webpack.dll.config.js文件，并在其中配置需要单独DLL化的模块

1.2、webpack.dev.conf.js 和 webpack.prod.conf.js 增加插件：
new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require('./vendor-manifest.json')
}),

1.3、package.json增加命令：
"dll": "webpack --config ./build/webpack.dll.config.js"

1.4、index.html增加DLL化JS引入：
<script src="/static/js/vendor.dll.js"></script>

2、happypack开启多核构建项目
2.1、npm install happypack --save-dev

2.2、webpack.base.conf.js增加插件：
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
plugins: [
    new HappyPack({
      id: 'happy-babel-js',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool,
    })
  ],

3、source-map修改
3.1、config/index.js，dev环境使用eval（最快速度），prod环境关闭

npm run build --report

