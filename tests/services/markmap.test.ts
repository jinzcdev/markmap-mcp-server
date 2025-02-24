import { Transformer, builtInPlugins } from "markmap-lib";
import { fillTemplate } from "markmap-render";
import { describe, expect, it } from "vitest";

describe("Markmap Lib Test", () => {
    describe("export the markdown to HTML", () => {
        const testMarkdownContent = `# Test Mindmap
- Topic 1
  - Subtopic 1.1
  - Subtopic 1.2
- Topic 2
  - Subtopic 2.1
    - Detail 2.1.1`;

        it("should return HTML string", async () => {
            const transformer = new Transformer([...builtInPlugins]);
            const { root, features } =
                transformer.transform(testMarkdownContent);
            const assets = transformer.getUsedAssets(features);
            const html = fillTemplate(root, assets, undefined);

            expect(html).toBeDefined();
            expect(html).toContain("</html>");
            expect(html).toContain("Test Mindmap");
        }, 10000);
    });
});
