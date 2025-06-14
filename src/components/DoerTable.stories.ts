import type { Meta, StoryObj } from '@storybook/vue3';
import DoerTable from './DoerTable.vue';
import type { Doer } from '@/models/doer.model'; // Assuming Doer model exists

const meta: Meta<typeof DoerTable> = {
  title: 'Components/DoerTable',
  component: DoerTable,
  tags: ['autodocs'],
  argTypes: {
    doers: {
      control: 'object',
      description: 'Array of doer objects to display in the table.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data for Doers - will be used more extensively when table is implemented
const mockDoers: Doer[] = [
  { id: 1, firstName: 'Alice', lastName: 'Smith', totalTodos: 5 },
  { id: 2, firstName: 'Bob', lastName: 'Johnson', totalTodos: 3 },
  { id: 3, firstName: 'Charlie', lastName: 'Brown', totalTodos: 8 },
  { id: 4, firstName: 'Diana', lastName: 'Prince', totalTodos: 2 },
  { id: 5, firstName: 'Edward', lastName: 'Hyde', totalTodos: 0 },
  { id: 6, firstName: 'Fiona', lastName: 'Gallagher', totalTodos: 12 },
  { id: 7, firstName: 'George', lastName: 'Jetson', totalTodos: 1 },
  { id: 8, firstName: 'Helen', lastName: 'Troy', totalTodos: 4 },
  { id: 9, firstName: 'Ivan', lastName: 'Drago', totalTodos: 6 },
  { id: 10, firstName: 'Jane', lastName: 'Doe', totalTodos: 7 },
  { id: 11, firstName: 'Kyle', lastName: 'Broflovski', totalTodos: 9 },
  { id: 12, firstName: 'Laura', lastName: 'Palmer', totalTodos: 0 },
  { id: 13, firstName: 'Mike', lastName: 'Wheeler', totalTodos: 3 },
];

export const Default: Story = {
  args: {
    doers: mockDoers.slice(0, 5), // Display first 5 by default for this story
  },
};

export const NoDoers: Story = {
  name: 'No Doers',
  args: {
    doers: [],
  },
};

export const ThreeDoers: Story = {
  name: 'Three Doers',
  args: {
    doers: mockDoers.slice(0, 3),
  },
};

export const ThirteenDoers: Story = {
  name: 'Thirteen Doers (Pre-Pagination)',
  args: {
    doers: mockDoers,
  },
};
// Note: ThirteenDoersPaginated story name is changed to ThirteenDoers
// as pagination will be handled within the component itself.
// This story will show all 13 doers, and later the component will paginate them.
