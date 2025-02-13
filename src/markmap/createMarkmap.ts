import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import { tmpdir } from "os";
import { join } from "path";

import { Transformer, builtInPlugins } from "markmap-lib";
import { fillTemplate } from "markmap-render";

import open from "open";

interface CreateMarkmapOptions {
    /**
     * Markdown content to be converted into a mind map
     */
    content: string;
    /**
     * Output file path, if not provided, a temporary file will be created
     */
    output?: string;
    /**
     * Whether to open the output file after generation
     * @default false
     */
    openIt?: boolean;
}

interface CreateMarkmapResult {
    /**
     * Path to the generated HTML file
     */
    filePath: string;
    /**
     * Content of the generated HTML file
     */
    content: string;
}

/**
 * Creates a mind map from Markdown content with additional features.
 *
 * @param options Options for creating the mind map
 * @returns Promise containing the generated mind map file path and content
 */
export async function createMarkmap(
    options: CreateMarkmapOptions
): Promise<CreateMarkmapResult> {
    const { content, output, openIt = false } = options;

    // If no output path is provided, generate a default file path in the temp directory
    const filePath = output || join(tmpdir(), `markmap-${randomUUID()}.html`);

    const transformer = new Transformer([...builtInPlugins]);
    const { root, features } = transformer.transform(content);
    const assets = transformer.getUsedAssets(features);
    const html = fillTemplate(root, assets, undefined);

    // Add markmap-toolbar related code
    const toolbarCode = `
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/markmap-toolbar@0.18.10/dist/style.css"
    />

    <script src="https://cdn.jsdelivr.net/npm/markmap-toolbar@0.18.10/dist/index.js"></script>
    <script>
      ((r) => {
          setTimeout(r);
      })(() => {
          const { markmap, mm } = window;
          const toolbar = new markmap.Toolbar();
          toolbar.attach(mm);
          const el = toolbar.render();
          el.setAttribute(
              "style",
              "position:absolute;bottom:20px;right:20px"
          );
          document.body.append(el);
          
          // Ensure the mind map fits the current view
          setTimeout(() => {
            if (mm && typeof mm.fit === 'function') {
              mm.fit();
            }
          }, 1200);
      });
    </script>
  `;

    // Add scripts and styles for additional features
    const additionalCode = `
    <!-- Add html-to-image library -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.11.11/html-to-image.min.js"></script>

    <!-- Hidden element to store original Markdown content -->
    <textarea id="original-markdown" style="display:none;">${content}</textarea>

    <style>
      /* Export toolbar styles */
      .mm-export-toolbar {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 8px;
        padding: 8px 16px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        display: flex;
        gap: 10px;
      }
      .mm-export-btn {
        padding: 6px 12px;
        border: none;
        border-radius: 4px;
        background-color: #3498db;
        color: white;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.3s;
      }
      .mm-export-btn:hover {
        background-color: #2980b9;
      }
      .mm-copy-btn {
        background-color: #27ae60;
      }
      .mm-copy-btn:hover {
        background-color: #219653;
      }
      @media print {
        .mm-export-toolbar { display: none !important; }
        .mm-toolbar { display: none !important; }
        svg.markmap, svg#mindmap, #mindmap svg { 
          display: block !important;
          visibility: visible !important; 
          opacity: 1 !important;
          height: 100vh !important;
          width: 100% !important;
          max-width: 100% !important;
          max-height: 100vh !important;
          overflow: visible !important;
          page-break-inside: avoid !important;
        }
        body, html {
          height: 100% !important;
          width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: visible !important;
        }
      }
    </style>

    <script>
      (function() {
        // Create bottom export toolbar
        const exportToolbar = document.createElement('div');
        exportToolbar.className = 'mm-export-toolbar';
        document.body.appendChild(exportToolbar);
        
        // Export as PNG image
        const pngBtn = document.createElement('button');
        pngBtn.className = 'mm-export-btn png-export';
        pngBtn.innerHTML = 'Export PNG';
        pngBtn.title = 'Export as PNG image';
        pngBtn.onclick = () => {
          exportToImage('png');
        };
        exportToolbar.appendChild(pngBtn);

        // Export as JPG image
        const jpgBtn = document.createElement('button');
        jpgBtn.className = 'mm-export-btn jpg-export';
        jpgBtn.innerHTML = 'Export JPG';
        jpgBtn.title = 'Export as JPG image';
        jpgBtn.onclick = () => {
          exportToImage('jpeg');
        };
        exportToolbar.appendChild(jpgBtn);
        
        // Export as SVG image
        const svgBtn = document.createElement('button');
        svgBtn.className = 'mm-export-btn svg-export';
        svgBtn.innerHTML = 'Export SVG';
        svgBtn.title = 'Export as SVG image';
        svgBtn.onclick = () => {
          exportToImage('svg');
        };
        exportToolbar.appendChild(svgBtn);

        // Copy original Markdown button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'mm-export-btn mm-copy-btn copy-markdown';
        copyBtn.innerHTML = 'Copy Markdown';
        copyBtn.title = 'Copy original Markdown content';
        copyBtn.onclick = copyOriginalMarkdown;
        exportToolbar.appendChild(copyBtn);

        // Function to copy original Markdown content
        function copyOriginalMarkdown() {
          try {
            const markdownElement = document.getElementById('original-markdown');
            if (!markdownElement) {
              throw new Error('Original Markdown content not found');
            }
            
            const markdownContent = markdownElement.value;
            
            // Copy to clipboard
            navigator.clipboard.writeText(markdownContent)
              .then(() => {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '✓ Copied';
                copyBtn.style.backgroundColor = '#2ecc71';
                
                setTimeout(() => {
                  copyBtn.innerHTML = originalText;
                  copyBtn.style.backgroundColor = '';
                }, 2000);
              })
              .catch(err => {
                console.error('Copy failed:', err);
                alert('Failed to copy to clipboard, please check browser permissions');
              });
          } catch (e) {
            console.error('Error copying Markdown:', e);
            alert('Unable to copy Markdown: ' + e.message);
          }
        }

        // Function to export image
        function exportToImage(format) {
          try {
            const node = window.mm.svg._groups[0][0];
            
            if (!node) {
              throw new Error('Cannot find mind map SVG element');
            }

            window.mm.fit().then(() => {
              const options = {
                backgroundColor: "#ffffff", 
                quality: 1.0,
                width: node.getBoundingClientRect().width,
                height: node.getBoundingClientRect().height
              };
              
              const exportPromise = format === 'svg' 
                ? htmlToImage.toSvg(node, options)
                : format === 'jpeg' 
                  ? htmlToImage.toJpeg(node, options) 
                  : htmlToImage.toPng(node, options);
              
              exportPromise
                .then((dataUrl) => {
                  const link = document.createElement('a');
                  const timestamp = new Date().toISOString().slice(0, 10);
                  link.download = \`markmap-\${timestamp}.\${format === 'jpeg' ? 'jpg' : format === 'svg' ? 'svg' : 'png'}\`;
                  link.href = dataUrl;
                  link.click();
                })
                .catch((err) => console.error("Export failed:", err));
            })
            .catch((err) => {
                throw err;
            });
              
          } catch (e) {
            console.error('Error exporting image:', e);
            alert('Image export failed: ' + e.message);
          }
        }
      })();
    </script>
  `;

    const updatedContent = html.replace(
        "</body>",
        `${toolbarCode}\n${additionalCode}\n</body>`
    );

    await fs.writeFile(filePath, updatedContent);

    if (openIt) {
        await open(filePath);
    }

    return {
        filePath,
        content: updatedContent
    };
}
