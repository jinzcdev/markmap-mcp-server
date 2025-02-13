import { Transformer, builtInPlugins } from "markmap-lib";
import { fillTemplate } from "markmap-render";
import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("Markmap Lib", () => {
    describe("export the markdown to HTML", () => {
        it("should return HTML string", async () => {
            const mindMapPath =
                "/Users/jinzcdev/projects/markmap-mcp-server/mind.md";

            const markdownContent = await readFile(mindMapPath, {
                encoding: "utf-8"
            });

            const transformer = new Transformer([...builtInPlugins]);
            const { root, features } = transformer.transform(markdownContent);
            const assets = transformer.getUsedAssets(features);
            const html = fillTemplate(root, assets, undefined);

            expect(html).toBeDefined();
        }, 30000);
    });
});
