import type { Preview } from '@storybook/vue3-vite';
import '../src/assets/base.css';
import '../src/assets/main.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#222' },
        { name: 'light', value: '#fff' },
      ],
    },
    themes: {
      default: 'dark',
      list: [
        { name: 'dark', class: 'dark', color: '#222' },
        { name: 'light', class: 'light', color: '#fff' },
      ],
    },
  },
};

export default preview;
