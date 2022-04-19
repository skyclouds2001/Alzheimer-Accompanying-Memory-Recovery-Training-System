# 阿尔兹海默症陪伴型记忆恢复训练系统

## 源码结构

- api 接口方法目录
- components 公共组件目录
  - tabs 头部导航栏
- docs 文档目录
- images 本地图片目录
- icons 本地图标目录
- lib 公共方法目录
  - request.js 包装请求方法
- pages 小程序页面目录
  - index 首页
- style 共有样式表目录
- utils 工具目录
  - util.js 时间格式化及数字格式化
- app.js
- app.json
- app.wxss

## 项目初始化

- 预先安装npm并配置npm的系统变量

- 安装npm下的所有依赖包
npm install

- 小程序开发工具菜单
工具-构建npm

- 使用 以van-button为例

  - 页面json文件配置

  ```json
  {
    "usingComponents": {
      "van-button": "@vant/weapp/button"
    }
  }
  ```

  - 页面wxml文件使用

  ```html
  <van-button type="default">默认按钮</van-button>
  ```

