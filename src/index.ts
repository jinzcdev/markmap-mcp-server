#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import minimist from "minimist";
import { existsSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { registerMarkmapTools } from "./mcp/tools/markmap-tools.js";
import logger from "./utils/logger.js";

/**
 * Parses and validates command line arguments for the Markmap MCP Server.
 *
 * @returns Configuration object with input and output file options
 */
function parseArgs() {
    const args = minimist(process.argv.slice(2), {
        string: ["output"],
        boolean: ["help"],
        alias: {
            o: "output",
            h: "help"
        }
    });

    if (args.help) {
        logger.info(`Markmap MCP Server - Mind map generator for Markdown

  Usage: markmap-mcp-server [options]

  Options:
    --output, -o <file>        Output HTML file directory
    --help, -h                 Show this help message`);
        process.exit(0);
    }

    return {
        output: args.output || process.env.MARKMAP_DIR,
        open: args.open || false
    };
}

/**
 * Main function that initializes and starts the Markmap MCP Server.
 * This function reads the input markdown file and generates a mind map.
 */
async function main() {
    const options = parseArgs();

    const server = new McpServer({
        name: "Markmap MCP Server",
        version: "0.1.0"
    });

    let outputPath;
    if (options.output) {
        if (!existsSync(options.output)) {
            mkdirSync(options.output, { recursive: true });
        }
        outputPath = options.output;
    } else {
        const tempDir = join(tmpdir(), "markmap");
        if (!existsSync(tempDir)) {
            mkdirSync(tempDir, { recursive: true });
        }
        outputPath = tempDir;
    }

    registerMarkmapTools(server, { output: outputPath });

    const transport = new StdioServerTransport();
    await server.connect(transport);
}

main().catch((error) => {
    logger.error("Failed to start Markmap MCP Server: %s", error);
    process.exit(1);
});
