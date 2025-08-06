import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  viteFinal: async (config) => {
    // Ensure Vite resolves the same path aliases as TypeScript
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@layouts": "/src/layouts",
      "@components": "/src/components",
      "@utils": "/src/utils",
      "@pages": "/src/pages",
      "@apis": "/src/apis",
      "@constants": "/src/constants",
      "@contexts": "/src/contexts",
      "@hooks": "/src/hooks",
      "@assets": "/src/assets",
      "@i18n": "/src/i18n",
      "@locales": "/src/locales",
      "@msw": "/src/msw",
      "@": "/src",
    };
    return config;
  },
};
export default config;
