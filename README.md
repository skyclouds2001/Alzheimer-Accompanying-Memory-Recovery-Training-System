# 阿尔兹海默症陪伴型记忆恢复训练系统

## 项目结构

- api 接口方法目录（主要关于与后端交互的接口方法的模块）
- components 公共组件目录
  - tabs 导航栏
- docs 项目文档目录
- images 本地图片目录
- icons 本地图标目录
- lib 公共方法目录（主要关于对wx原生方法包装的模块）
  - request.js 包装请求方法
- pages 小程序页面目录
  - index 首页
  - mine 个人中心|我的
  - logs 日志【不用管它】
- style 共用样式表目录
- utils 工具目录（其他模块）
  - util.js 时间格式化及数字格式化
- app.js
- app.json
- app.wxss

## 项目初始化

- 预先安装npm并配置npm的系统变量

- 根目录运行命令行
  安装npm下的所有依赖包

  ```shell
  npm install
  ```

- 小程序开发工具菜单
  工具-构建npm

- 使用vant
  以使用van-button为例

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

## 项目其他设定

- tabbar 标签栏
  选中配色 `#158261`    未选中配色 `#2c2c2c`
  首页    我的/个人中心

- navigator 暂时使用系统默认导航栏

- 基础库版本 `2.23.4`

- 临时在app.json中开启debug模式，方便后续调试（发布时需要移除）
