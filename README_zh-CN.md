# Markmap MCP 服务器

![321](./docs/markmap_zh.svg)

[![NPM Version](https://img.shields.io/npm/v/@jinzcdev/markmap-mcp-server.svg)](https://www.npmjs.com/package/@jinzcdev/markmap-mcp-server)
[![GitHub License](https://img.shields.io/github/license/jinzcdev/markmap-mcp-server.svg)](LICENSE)
[![English Doc](https://img.shields.io/badge/English-Click-blue)](README.md)
[![Stars](https://img.shields.io/github/stars/jinzcdev/markmap-mcp-server)](https://github.com/jinzcdev/markmap-mcp-server)

Markmap MCP Server 基于 [模型上下文协议 (MCP)](https://modelcontextprotocol.io/introduction)，可将 Markdown 文本一键转换为交互式思维导图，底层采用开源项目 [markmap](https://github.com/markmap/markmap)。生成的思维导图支持丰富的交互操作，并可导出为多种图片格式。

## 特性

- 🌠 **Markdown 转思维导图**：将 Markdown 文本转换为交互式思维导图
- 🖼️ **多格式导出**：支持导出为 PNG、JPG 和 SVG 格式的图片
- 🔄 **交互式操作**：支持缩放、展开/折叠节点等交互功能
- 📋 **Markdown 复制**：一键复制原始 Markdown 内容
- 🌐 **自动浏览器预览**：可选择自动在浏览器中打开生成的思维导图

## 前提条件

1. Node.js 运行环境

## 安装

### 手动安装

```bash
# 从 npm 安装
npm install @jinzcdev/markmap-mcp-server -g

# 基本运行
npx -y @jinzcdev/markmap-mcp-server

# 指定输出目录
npx -y @jinzcdev/markmap-mcp-server --output /path/to/output/directory
```

或者，您可以克隆仓库并在本地运行：

```bash
# 克隆仓库
git clone https://github.com/jinzcdev/markmap-mcp-server.git

# 导航到项目目录
cd markmap-mcp-server

# 构建项目
npm install && npm run build

# 运行服务器
node build/index.js
```

## 使用方法

添加以下配置到您的 MCP 客户端配置文件中：

```json
{
  "mcpServers": {
    "markmap": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@jinzcdev/markmap-mcp-server",
        "--output",
        "/path/to/output/directory"
      ]
    }
  }
}
```

> [!TIP]
>
> 服务支持以下环境变量：
>
> - `MARKMAP_DIR`：指定思维导图的输出目录（可选，默认为系统临时目录）
>
> **优先级说明**：
>
> 当同时指定命令行参数 `--output` 和环境变量 `MARKMAP_DIR` 时，命令行参数优先。

## 可用工具

### markdown-to-mindmap

将 Markdown 文本转换为交互式思维导图。

**参数：**

- `markdown`：要转换的 Markdown 内容（必填字符串）
- `open`：是否在浏览器中自动打开生成的思维导图（可选布尔值，默认为 false）

**返回值：**

```json
{
  "content": [
    {
      "type": "text",
      "text": "JSON_DATA_OF_MINDMAP_FILEPATH"
    }
  ]
}
```

## 许可证

本项目采用 MIT 许可证。
