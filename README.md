### 如何安装

#### npm

```bash
npm install sun-react-ui --save
```

#### yarn

```bash
yarn add sun-react-ui
```

### 如何使用

```javascript
// 引入组件
import { Button } from 'sun-react-ui';
```

[使用参考文档](https://sun.jgchen.xin)

### 相关知识

- 🔥 ts + react hook 的组件
- ⛑️ 使用 lerna 进行多包管理
- 📚 使用 dumi 自动生成文档 跟 打包组件， dumi/test 本地测试
- 📦 使用 [Feather 图标 参考文档](https://feathericons.com/) 进行二次封装作为自己的图标库，支持更自由的自定义属性
- 🌹 样式（less）文件从零开始，可配置抽象
- 🎉 一键发布版本，CI/CD 集成：使用[netlify](https://app.netlify.com/)自动发布部署文档

### 开发命令

```bash
# 启动本地调试开发
yarn start

# 构建组件库文档
yarn docs:build

# 构建组件库
yarn build

# CI LINT 检查
yarn lint

# 跑单元测试
yarn test
```

## npm 源相关注意事项

### 发包之前需要设置为官方的源

```bash
npm config registry http://registry.npmjs.org
# or 如果你使用了nrm
nrm use npm
```

如果还未登陆过 npm 账户，那么应该手动登陆下

```bash
npm adduser # 输入你的npm 用户名，邮箱，密码登陆【非github账户，npm账户：http://registry.npmjs.org】
```

## 如果 npm 装依赖太慢,考虑使用淘宝源

```bash
npm config set registry https://registry.npm.taobao.org
# or 如果你使用了nrm
nrm use taobao
```
