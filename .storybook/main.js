/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.stories.js'],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  // Serve the design-system assets at the same paths the style guide uses,
  // so apertus.css's relative url("../design/…") references resolve.
  staticDirs: [
    { from: '../css', to: '/css' },
    { from: '../design', to: '/design' },
  ],
};
export default config;
