export default {
    printWidth: 80,
    tabWidth: 4,
    useTabs: false,
    trailingComma: "none",
    semi: true,
    singleQuote: false,
    overrides: [
        {
            files: ["**/*.md", "**/*.yml"],
            options: {
                tabWidth: 2
            }
        }
    ],
    plugins: ["prettier-plugin-organize-imports"]
};
