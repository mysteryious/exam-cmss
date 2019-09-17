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
- 引入mobx
```
npm install --save-dev mobx mobx-react
```
- 引入scss
```
npm run eject 导出webpack配置
npm install node-sass sass-loader 

config/webpack.config.dev.js 添加webpack配置
{
    test: /\.scss$/,
    loader: ['style-loader', {
        loader: 'css-loader',
        options: {
            modules: true,
            // localIdentName: '[path][name]---[local]--[hash:base64:5]',
            localIdentName: '[name]_[local]_[hash:base64:5]'
        }
    },
    'sass-loader']
},

warning: 如果报错 TypeError: this.getResolve is not a function
更改"sass-loader": "^8.0.0" => "sass-loader": "^7.3.1",
```

# 项目功能

- 权限管理  
  - 合适的声明周期获取用户信息，进而获取权限信息
  - 对照前端路由表，筛选出用户拥有的权限和禁止的权限
  - 绘制左边导航菜单，动态配置路由，正确重定向到403，404页面

- [引入国际化](https://www.npmjs.com/package/react-intl)
  ```
  npm i -S react-intl
  ```
  - 增加lang国际化配置，添加语言配置文件(en-US,ZH-US)
  - 用IntelProvider(locale, message)包裹根组件
  - 在组件内提供injectIntl注入inject，inject.formatMessage({id})来设置显示内容


# 打包静态文件
```
npm run build
```

# 发布上线  减少资源大小的配置

## sourceMap
### 作用
把线上代码和本地源文件做映射，报错时直接显示源文件中代码的位置

### 使用
```
//# sourceMappingURL=0.c58a1879.chunk.js.map
```

## antd 按需加载
Babel中使用
```
//antd按需加载引入
"pulgins" = [
  ["import", {
    "libraryName": "antd",
    "libraryDirectory": "es",
    "style": "css"
  }],
  //装饰器语法配置
  [
    "@babel/plugin-proposal-decorators",
    {
      "legacy": true
    }
  ]
]

```


## 在ts中使用

```
npm i -D ui-component-loader
//在webpack.config.prod中添加loader
{
    test: /\.(ts|tsx)$/,
    include: paths.appSrc,
    use: [
        {
        loader: require.resolve('ts-loader'),
        options: {
            // disable type checker - we will use it in fork plugin
            transpileOnly: true,
            configFile: paths.appTsProdConfig,
        },
        },
        {
        loader: 'ui-component-loader',
        options: {
            'lib': 'antd',
            'camel2': '-',
            'style': 'style/css.js',
        }
        }
    ],
}
```
## node_modules中非业务逻辑包的抽离
在webpack3中使用[CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/#root)

```
new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  minChunks: function (module) {
    // This prevents stylesheet resources with the .css or .scss extension
    // from being moved from their original chunk to the vendor chunk
    if(module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
      return false;
    }
    return module.context && module.context.includes('node_modules');
  }
});
```

在webpack4中配置[SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/)

```
optimization: {
 splitChunks: {
        cacheGroups: {
            vendor: {   // 抽离第三方插件
                test: /node_modules/,   // 指定是node_modules下的第三方包
                chunks: 'initial',
                name: 'vendor',  // 打包后的文件名，任意命名    
                // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                priority: 10    
            },
            utils: { // 抽离自己写的公共代码，utils这个名字可以随意起
                chunks: 'initial',
                name: 'utils',  // 任意命名
                minChunks: 2,   // 引用次数最少两次
                minSize: 0    // 只要超出0字节就生成一个新包
            }
        }
    }
}
```