# 考试管理后台

## 目录
- api - 接口
- components - 组件
- router - 路由
    - index.js 加载页面
    - RouteConfig.js 路由
    - RouteView.js  递归渲染
- store - 状态管理
  - index.js 入口文件
- utils - 公共部件
- views 页面

# 启动项目

- 初始化
```js
create-react-app exam-cms --scripts-version=react-scripts-ts
```
- 起服务

```js
npm run dev
```

# 环境搭建

- 引入装饰器
```js
npm install --save-dev @babel/plugin-proposal-decorators
```
- 引入路由

```js
npm install --save-dev react-router
```
- 引入antd
```js
yarn add antd
```