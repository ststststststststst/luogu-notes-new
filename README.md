

# 洛谷笔记新

## 介绍

欢迎使用洛谷笔记新！这是一个为用户提供便捷笔记功能的开源项目，特别适配洛谷平台的学习和练习场景。通过本项目，用户可以轻松记录解题思路、学习笔记等内容，提高学习效率。

## 软件架构

本项目基于现代 Web 技术构建，主要采用以下技术栈：

- **前端**：使用 [Next.js](https://nextjs.org) 框架进行页面构建。
- **样式**：CSS 样式通过 `globals.css` 进行全局管理。
- **编辑器支持**：使用 `textarea` 作为基础编辑器，支持 Markdown 格式和 KaTeX 数学公式渲染。

## 安装教程

1. 确保你已安装 [Node.js](https://nodejs.org)（建议使用最新稳定版）。
2. 克隆仓库：
   ```bash
   git clone https://gitee.com/sunny-town/luogu-notes-new.git
   ```
3. 进入项目目录：
   ```bash
   cd luogu-notes-new
   ```
4. 安装依赖：
   ```bash
   npm install
   ```
5. 启动开发服务器：
   ```bash
   npm run dev
   ```

## 使用说明

- 所有笔记页面通过 `pages/[id].js` 动态路由实现，每个笔记通过唯一 ID 进行标识。
- 用户可以通过编辑器输入 Markdown 内容，并实时预览渲染结果。
- 数学公式支持 KaTeX 渲染，使用 `.katex` 和 `.katex-display` 类进行样式控制。
- 点击按钮即可保存或导出笔记。

## 参与贡献

我们欢迎社区的贡献！请通过以下步骤参与：

1. Fork 仓库。
2. 创建新分支 (`git checkout -b feature/your-feature-name`)。
3. 提交更改 (`git commit -am 'Add some feature'`)。
4. Push 到分支 (`git push origin feature/your-feature-name`)。
5. 提交 Pull Request。

## 特技

- 支持 Markdown 编辑与实时预览。
- 集成 KaTeX 渲染，适合数学内容记录。
- 动态路由支持无限扩展笔记页面。
- 简洁美观的 UI 设计，提升用户体验。