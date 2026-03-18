# Markmap MCP Server

![Sample Mindmap](./docs/markmap.svg)

[![NPM Version](https://img.shields.io/npm/v/@jinzcdev/markmap-mcp-server.svg)](https://www.npmjs.com/package/@jinzcdev/markmap-mcp-server)
[![NPM Downloads](https://img.shields.io/npm/dm/@jinzcdev/markmap-mcp-server.svg)](https://www.npmjs.com/package/@jinzcdev/markmap-mcp-server)
[![GitHub License](https://img.shields.io/github/license/jinzcdev/markmap-mcp-server.svg)](LICENSE)
[![中文文档](https://img.shields.io/badge/简体中文-查看-blue)](README_zh-CN.md)
[![Stars](https://img.shields.io/github/stars/jinzcdev/markmap-mcp-server)](https://github.com/jinzcdev/markmap-mcp-server)

Markmap MCP Server is based on the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) that allows one-click conversion of Markdown text to interactive mind maps, built on the open source project [markmap](https://github.com/markmap/markmap). The generated mind maps support rich interactive operations and can be exported in various image formats.

## Features

- 🌠 **Markdown to Mind Map**: Convert Markdown text to interactive mind maps
- 🖼️ **Multi-format Export**: Support for exporting as PNG, JPG, and SVG images
- 🔄 **Interactive Operations**: Support for zooming, expanding/collapsing nodes, and other interactive features
- 📋 **Markdown Copy**: One-click copy of the original Markdown content
- 🌐 **Automatic Browser Preview**: Option to automatically open generated mind maps in the browser

## Prerequisites

1. Node.js (v20 or above)

## Installation

### Installing via Smithery

To install Markmap MCP Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@jinzcdev/markmap-mcp-server):

```bash
npx -y @smithery/cli install @jinzcdev/markmap-mcp-server --client claude
```

### Manual Installation

```bash
# Install from npm
npm install @jinzcdev/markmap-mcp-server -g

# Basic run
npx -y @jinzcdev/markmap-mcp-server

# Specify output directory
npx -y @jinzcdev/markmap-mcp-server --output /path/to/output/directory
```

Alternatively, you can clone the repository and run locally:

```bash
# Clone the repository
git clone https://github.com/jinzcdev/markmap-mcp-server.git

# Navigate to the project directory
cd markmap-mcp-server

# Build project
npm install && npm run build

# Run the server
node build/index.js
```

## Usage

Add the following configuration to your MCP client configuration file:

```json
{
  "mcpServers": {
    "markmap": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@jinzcdev/markmap-mcp-server"],
      "env": {
        "MARKMAP_DIR": "/path/to/output/directory"
      }
    }
  }
}
```

> [!TIP]
>
> The service supports the following environment variables:
>
> - `MARKMAP_DIR`: Specify the output directory for mind maps (optional, defaults to system temp directory)
>
> **Priority Note**:
>
> When both the `--output` command line argument and the `MARKMAP_DIR` environment variable are specified, the command line argument takes precedence.

## Available Tools

### markdown-to-mindmap

Convert Markdown text into an interactive mind map.

**Parameters:**

- `markdown`: The Markdown content to convert (required string)
- `open`: Whether to automatically open the generated mind map in the browser (optional boolean, default is false)

**Return Value:**

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

## Related Projects

🎉 Explore More Mind Mapping Tools:

| Project                                                                         | Description                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[MarkXMind Online](https://github.com/jinzcdev/markxmind)**                   | Create XMind mind maps with Markdown online. Supports real-time preview, one-click export as `.xmind` / `.md` / `.png` / `.svg`, and importing existing XMind files. [Try it now →](https://markxmind.js.org/) |
| **[Obsidian MarkXMind Plugin](https://github.com/jinzcdev/obsidian-markxmind)** | An Obsidian plugin that supports rendering XMindMark syntax as XMind mind maps inside `xmind` code blocks.                                                                                                     |

## License

This project is licensed under the [MIT](./LICENSE) License.
