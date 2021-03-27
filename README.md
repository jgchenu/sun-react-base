## sun-react-ui 组件库

### 安装

```javascript
npm install sun-react-ui --save or yarn install sun-react-ui
```

### [组件使用文档](https://jgchenu.github.io/sun-react-ui)
```javascript
// 加载样式
import "sun-react-ui/dist/index.css";
// 引入组件
import { Button } from "sun-react-ui";
```

### 相关知识

- 🔥 typescript with React Hooks
- ⛑️ 使用 react-testing-library 完成单元测试
- 📚 使用 storybook 本地调试和生成文档页面
- 📚 使用 react-doc-gen 自动生成文档
- 📦 使用第三方库扩充组件
  - 一款开源的免费图标组件[react-icons](https://github.com/react-icons/react-icons)
  - 📦 icon 组件可用图标 [参考文档](https://react-icons.netlify.com/#/)
- 🌹 样式（less）文件从零开始，可配置抽象
- 🎉 涉及全部流程，包括最后的 npm publish，husky 提交发布前验证，travis CI/CD 集成，发布文档站点等


### 开发命令

```bash
//启动本地环境
yarn start

//跑单元测试
yarn test

//打包 组件库静态资源
yarn build

//打包 组件库文档静态资源
yarn build:docs

//发布 组件库文档资源
yarn pub:docs


//发布到 npm
npm login --registry http://registry.npmjs.org/
npm publish --registry http://registry.npmjs.org/
```
