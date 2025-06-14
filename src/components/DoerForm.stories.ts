import type { Meta, StoryObj } from '@storybook/vue3-vite';

import DoerForm from './DoerForm.vue';

const meta = {
  title: 'Todo/DoerForm',
  component: DoerForm,
  tags: ['autodocs'],
} satisfies Meta<typeof DoerForm>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
    firstName: 'John',
    lastName: 'Doe',
    mode: 'edit',
  },
};
