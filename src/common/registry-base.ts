import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { MarkmapMcpContext } from "../mcp/tools/context.js";

export abstract class RegistryBase {
    /**
     * Creates a new registry instance.
     *
     * @param server - The MCP server instance to register components with
     * @param context - The context object containing configuration and state information
     */
    constructor(
        protected server: McpServer,
        protected context: MarkmapMcpContext
    ) {}

    /**
     * Registers all applicable components based on site version and authentication status.
     * This method follows a specific registration sequence to ensure proper component organization.
     */
    public abstract register(): void;
}
