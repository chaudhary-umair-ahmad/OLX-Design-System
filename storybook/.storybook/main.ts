import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  // The kit and Storybook serve the same files, so the pages can't drift apart.
  // css/ and tokens/ are the repo root's — the design system has one source of
  // truth, and this Storybook renders it rather than keeping a second copy.
  staticDirs: [
    { from: '../design-kit/templates', to: '/templates' },
    { from: '../../css', to: '/css' },
    { from: '../../tokens', to: '/tokens' },
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  // css/, tokens/ and their imports live one level up, outside Vite's root, so
  // the dev server has to be told it may serve the repo.
  viteFinal: async (config) => ({
    ...config,
    server: {
      ...config.server,
      fs: { ...config.server?.fs, allow: ['..'] },
    },
  }),
};

export default config;
