# AdminProjectWeb

## 项目介绍

`AdminProjectWeb`是一套完善的后台管理系统前端vue项目，采用了  VueJS、Vue-router、Vuex、ElementUI、Axios、webpack等核心技术，具有完善的用户动态路由权限验证以及各种后管功能。

其中包含了多种后管功能：

- 个人中心编辑功能

- 系统管理
  - 用户管理
  - 角色管理
  - 菜单管理
- 系统监控
  - 操作日志管理
  - 异常日志管理
  - Kibana可视化
- 组件管理
  - 图标库
  - 富文本编辑工具
  - markdown编辑工具
  - HuTool工具文档
- 小功能
  - 支付宝支付测试功能
  - 会议预约邮件提醒功能

## 项目结构

```
AdminProjectWeb
├── src -- 主要组件代码
    ├── assets -- 静态资源
    ├── api -- 后端接口请求配置
    ├── components -- 要用的小组件
    ├── icons -- 所有icons图标以及使用配置
    ├── layout -- 整体的路由页面布局
    ├── router -- 路由配置
    ├── store -- vuex配置
    ├── styles -- 样式
    ├── utils -- 工具类
    └── views -- 大组件页面
├── .env.development -- 开发环境配置
├── .env.production -- 生成环境配置
└── vue.config.js -- 项目配置文件
```

## 环境搭建

```
# clone the project
git clone https://github.com/Iooooot/AdminProjectWeb.git

# enter the project directory
cd AdminProjectWeb

# install dependency
npm install

# develop
npm run dev
```

## 效果演示
