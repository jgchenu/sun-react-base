### 如何安装

```javascript
npm install sun-react-ui --save
yarn add sun-react-ui
```

### 如何使用

```javascript
// 加载样式
import "sun-react-ui/dist/index.css";
// 引入组件
import { Button } from "sun-react-ui";
```

[更多使用参考文档](https://jgchenu.github.io/sun-react-ui)

### 相关知识

- 🔥 typescript with React Hooks
- ⛑️ 使用 react-testing-library 完成单元测试
- 📚 使用 storybook 本地调试和生成文档页面
- 📚 使用 react-doc-gen 自动生成文档
- 📦 使用第三方库扩充组件
  - 一款开源的免费图标组件[react-icons](https://github.com/react-icons/react-icons)
  - 📦 icon 组件可用图标 [参考文档](https://react-icons.netlify.com/#/)
- 🌹 样式（less）文件从零开始，可配置抽象
- 🎉 涉及全部流程，包括最后的 npm publish，husky 提交发布前验证，travis CI/CD 集成，使用[netlify](https://app.netlify.com/)自动发布部署文档


### 开发命令

```bash
//启动本地环境
yarn docs

//跑单元测试
yarn test

//打包 组件库静态资源
yarn build

//CI LINT 检查 
yarn lint

//打包 组件库文档静态资源
yarn build:docs
```
