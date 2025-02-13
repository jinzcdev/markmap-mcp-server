import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { RegistryBase } from "../../common/registry-base.js";
import { MarkmapMcpContext } from "./context.js";

export abstract class ToolRegistry extends RegistryBase {
    constructor(
        protected server: McpServer,
        protected context: MarkmapMcpContext
    ) {
        super(server, context);
    }

    /**
     * Registers all applicable tools based on site version and authentication status.
     * This method follows a specific registration sequence to ensure proper tool organization.
     */
    public registerTools(): void {
        this.register();
    }
}
