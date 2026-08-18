/** @type { import('storybook/internal/types').ProjectAnnotations } */
const preview = {
  parameters: {
    layout: 'padded',
    options: {
      storySort: {
        order: [
          'Foundations',
          ['Colors', 'Typography'],
          'Apertus Components',
          'Bootstrap Components',
        ],
      },
    },
  },
};
export default preview;
