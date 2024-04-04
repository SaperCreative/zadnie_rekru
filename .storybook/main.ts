import type { StorybookConfig } from "@storybook/nextjs";
import * as path from 'path'
import { Configuration } from 'webpack'

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {
      nextConfigPath: path.resolve(__dirname, "../next.config.js"),
    },
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["..\\public"],
  webpackFinal: (config: Configuration) => {
    const { module, resolve } = config ?? {}
    if (module?.rules && resolve?.alias) {
      resolve.alias = {
        ...resolve.alias,
        '@': [
          path.resolve(__dirname, '../src/'),
          path.resolve(__dirname, '../')
        ]
      }
      resolve.roots = [
        path.resolve(__dirname, '../public'),
        'node_modules'
      ]
    }
    return config
  }
  
};
export default config;
