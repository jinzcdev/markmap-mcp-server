import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { join } from "path";
import { z } from "zod";
import { createMarkmap } from "../../markmap/createMarkmap.js";
import { MarkmapMcpContext } from "./context.js";
import { ToolRegistry } from "./tool-registry.js";

export class MarkmapToolRegistry extends ToolRegistry {
    public register(): void {
        this.server.tool(
            "markdown_to_mindmap",
            "Convert a Markdown document into an interactive mind map",
            {
                markdown: z
                    .string()
                    .describe("Markdown content to convert into a mind map"),
                open: z
                    .boolean()
                    .default(false)
                    .describe(
                        "Whether to open the generated mind map in a browser (default: false)"
                    )
            },
            async ({ markdown, open }) => {
                try {
                    const filename = `markmap-${Date.now()}.html`;
                    const outputPath = join(this.context.output, filename);

                    const result = await createMarkmap({
                        content: markdown,
                        output: outputPath,
                        openIt: open
                    });

                    return {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify({
                                    filePath: result.filePath
                                })
                            }
                        ]
                    };
                } catch (error: any) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify({
                                    error: "Failed to generate markmap",
                                    message: error.message
                                })
                            }
                        ]
                    };
                }
            }
        );
    }
}

/**
 * Registers Markmap tools with the provided server and context.
 * @param server - The MCP server instance to register tools with
 * @param context - The context object containing configuration and state information
 */
export function registerMarkmapTools(
    server: McpServer,
    context: MarkmapMcpContext
): void {
    const registry = new MarkmapToolRegistry(server, context);
    registry.register();
}
