import type { Meta, StoryObj } from '@storybook/vue3';
import DoerTable from './DoerTable.vue';
import type { Doer } from '@/models/doer.model'; // Assuming Doer model exists

const meta: Meta<typeof DoerTable> = {
  title: 'Components/DoerTable',
  component: DoerTable,
  tags: ['autodocs'],
  argTypes: {
    // Define argTypes for props if DoerTable had them.
    // For now, it's a stub.
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
    // Props for DoerTable would go here.
    // For now, it's a stub, so no specific args.
    // This story will just render the stubbed component.
  },
  render: args => ({
    components: { DoerTable },
    setup() {
      return { args };
    },
    template: '<DoerTable v-bind="args" />',
  }),
};

// Placeholder stories for scenarios from .clinerules/03-Doer.md
// These will be properly implemented when DoerTable.vue is functional.

export const NoDoers: Story = {
  name: 'No Doers (Placeholder)',
  args: {
    // Simulate no doers - this will depend on how DoerTable handles data
  },
  // render function will be needed to pass empty data or set up a specific state
  // For now, it will just render the default stub.
};

export const ThreeDoers: Story = {
  name: 'Three Doers (Placeholder)',
  args: {
    // Simulate three doers
  },
  // render function will be needed to pass specific data
};

export const ThirteenDoersPaginated: Story = {
  name: 'Thirteen Doers - Paginated (Placeholder)',
  args: {
    // Simulate thirteen doers
  },
  // render function will be needed to pass specific data and test pagination
};
