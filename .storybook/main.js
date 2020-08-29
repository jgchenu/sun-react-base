const path = require("path");
const process = require("process");
const ROOT = process.cwd();
const entryPath = path.resolve(ROOT, "./src");
const StylelintPlugin = require("stylelint-webpack-plugin");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/preset-create-react-app",
      options: {
        craOverrides: {
          fileLoaderExcludes: ["less"],
        },
      },
    },
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.less$/,
      loaders: [
        "style-loader",
        "css-loader",
        {
          loader: "less-loader",
          options: {
            lessOptions: {
              javascriptEnabled: true,
            },
          },
        },
      ],
      include: [entryPath],
    });
    config.plugins.push(
      new StylelintPlugin({
        context: entryPath,
        files: ["**/*.css", "**/*.less"],
      })
    );
    return config;
  },
};
