## webpack使用总结
### 1.初始化一个项目
```javascript
npm init -y
```
之后会生成一个package.json配置文件。
### 2.安装webpack,vue,vue-loader
```javascript
npm install webpack vue vue-loader
```
之后可相应的安装css-loader,vue-template-compiler编译vue模板的依赖包
```javascript
npm install css-loader vue-template-compiler
```
### 3.在项目文件下新建src文件(我们用来开发的源代码文件)，在src下新建index.js作为我们项目的入口文件，新建app.vue作为我们vue模板文件。在项目文件下新建webpack.config.js，进行配置。
```javascript
const path = require("path");//nodejs中的基本包，处理路径的
module.exports = {
  entry: path.join(__dirname,"src/index.js"),//项目唯一入口，__dirname代表文件所在的目录
  output: {
    filename: "bundle.js",
    path: path.join(__dirname,"dist")//webapck打包后输出的文件路径
  }
}
```
### 4.修改package.json文件
```javascript
"scripts": {
  "build": "webpack --config webpack.config.js"
  //只有在这里面写webpack他才会调用这里面的webpack版本,否则会调用全局的webpack,会导致很多版本不同出错
}
```
下面可进行测试打包功能，运行npm run build看是否打包成功，是否创建新的文件dist有bundle.js
可能遇到的错误提示"install webpack-cli -D",这个问题很烦，重新安装，不行卸载在安装。
### 5.配置服务器server
```javascript
npm install webpack-dev-server
```
安装之后配置package.json文件
```javascript
"scripts": {
  "dev": "webpack-dev-server --config webpack.config.js"
}
```
之后在webpack.config.jsmodule.exports对象中配置全局的编译平台。
```javascript
module.exports = {
  target: "web",
  entry: "..."
}
```
再次还需安装一个cross-env的插件用来配置运行环境变量。
```javascript
npm install cross-env
```
安装之后修改package.json文件
```javascript
"build": "cross-env NODE_ENV=production webpack --config webpack.config.js",
"dev": "cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js"
```
再来修改webpack.config.js文件，根据判断运行环境变量(确定是开发平台还是生产环境)配置服务器
```javascript
const isDev = process.env.NODE_ENV === "development";//判断是不是develment开发者环境。在cross-env里面设置的环境变量都在process.env这个对象读取
const config = {
  target: "web",
  ...
}
if(isDev) {
  config.devServer = {//给config添加一个对象。server是webpack2.0
    port: "8000",
    host: "0.0.0.0",//可以通过localhost,127.0.0.1,访问，也可以手机测试，其他本机内网也可以访问。
    overlay: {
      errors: true//编译时出现错误显示
    }
  }
}

module.exports = config;
