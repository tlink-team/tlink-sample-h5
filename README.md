# 前言

随着T信的用户越来越多，需要接入到T信平台的轻应用也越来越多，对底座的需求也越来越多，在这个背景下，我们决定搭建一套易上手的框架，针对cordova的封装及使用做了说明，方便用户快速上手。

## 技术栈

vue + vuex + vue-router + webpack + ES6/7

## 项目运行

#### 注意：由于涉及大量的 ES6/7 等新属性，node 需要 10.15.3 及以上版本

```
git clone https://github.com/tlink-team/tlink-sample-h5.git

cd tlink-sample-h5

npm install 或 使用淘宝镜像安装cnpm(国内建议使用) cnpm install

npm run dev（默认，连接测试环境 等价于 npm run dev:test 或 npm run serve）【本地运行】

npm run dev:local (连接本地开发环境) 【本地运行】

npm run dev:prod (连接生产环境) 【本地运行】

npm run build (默认，连接测试环境 等价于 npm run build:test-cur 打包版本号不递增) 【打包】

npm run build:test (连接测试环境 打包版本号递增) 【打包】

npm run build:prod-cur (连接生产环境 打包版本号不递增) 【打包】

npm run build:prod (连接生产环境 打包版本号递增) 【打包】

```

## 项目目录结构

```
.
├── public                                      // 公用静态资源目录
│   ├── static                                  // 静态资源目录
│   ├── CubeModule.json                         // 离线包配置文件
│   ├── favicon.ico                             // 图标
│   └── index.html                              // 入口html文件
├── src                                         // 源码目录
│   ├── assets                                  // 需要处理的资源目录
│   │   ├── images                              // 图片目录
│   │   ├── js                                  // js目录
│   │   │   ├── api.js                          // api接口文件
│   │   │   ├── config.js                       // 全局配置文件
│   │   │   ├── cordova.js                      // cordova底座方法文件
│   │   │   ├── event.js                        // 事件文件
│   │   │   ├── lang.js                         // 多语言文件
│   │   │   ├── request.js                      // 请求封装文件
│   │   │   ├── tip.js                          // 常用提示文件
│   │   │   └── util.js                         // 常用的工具类文件
│   │   └── less
│   │   │   ├── base.less                       // 基本样式文件
│   │   │   ├── index.less                      // 全局入口样式文件
│   │   │   ├── mixin.less                      // 公用方法样式文件
│   │   │   └── variables.less                  // 全局变量样式文件 
│   ├── components                              // 公用组件
│   ├── pages                                   // 页面目录
│   │   ├── 404                                 // 404页面目录
│   │   │   └── index.vue                       // 404页面
│   │   ├── layout                              // 布局目录
│   │   │   ├── item                            // 布局公用组件
│   │   │   │    ├── layoutHeader.vue           // 头部组件
│   │   │   │    └── layoutMain.vue             // 主体组件
│   │   │   └── layout.vue                      // 布局核心组件
│   │   ├── sample                              // 样例组件
│   │   │   ├── sample-01.vue                   // 样例组件1
│   │   │   └── sample-02.vue                   // 样例组件2
│   ├── vuex                                    // store目录
│   ├── App.vue                                 // 页面入口文件
│   ├── filter.js                               // 过滤器文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
│   └── router.js                               // 路由文件
├── .gitignore                                
├── babel.config.js
├── package.json 
├── package-lock.json 
├── README.md 
└── vue.config.js 
```



#### 备注：轻应用普通交互直接在浏览器中完成测试即可，涉及到与T信交互的需要调用cordova完成，并在T信中测试才有效。

