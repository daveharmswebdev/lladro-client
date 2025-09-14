import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import DoerTable from '../DoerTable.vue';
import type { Doer } from '@/models/doer.model';

const mockDoers: Doer[] = [
  { id: 1, firstName: 'Alice', lastName: 'Smith', totalTodos: 5 },
  { id: 2, firstName: 'Bob', lastName: 'Johnson', totalTodos: 3 },
  { id: 3, firstName: 'Charlie', lastName: 'Brown', totalTodos: 8 },
  { id: 4, firstName: 'Diana', lastName: 'Prince', totalTodos: 2 },
  { id: 5, firstName: 'Edward', lastName: 'Hyde', totalTodos: 0 },
  { id: 6, firstName: 'Fiona', lastName: 'Gallagher', totalTodos: 12 },
  { id: 7, firstName: 'George', lastName: 'Jetson', totalTodos: 1 },
];

describe('DoerTable.vue', () => {
  let wrapper: VueWrapper<InstanceType<typeof DoerTable>>;

  beforeEach(() => {
    // Default mount, can be overridden in specific tests
    wrapper = mount(DoerTable, {
      props: {
        doers: [],
      },
    });
  });

  it('renders the table title', () => {
    expect(wrapper.find('h2').text()).toBe('Doer List');
  });

  describe('No Doers Condition', () => {
    it('displays the "You currently do not have any doers." message when no doers are provided', () => {
      expect(wrapper.text()).toContain('You currently do not have any doers.');
      expect(wrapper.find('table').exists()).toBe(false);
    });
  });

  describe('With Doers', () => {
    beforeEach(() => {
      wrapper = mount(DoerTable, {
        props: {
          doers: [...mockDoers], // Use a copy
        },
      });
    });

    it('displays the table headers', () => {
      const headers = wrapper.findAll('th');
      expect(headers.length).toBe(4);
      expect(headers[0].text()).toContain('ID');
      expect(headers[1].text()).toContain('First Name');
      expect(headers[2].text()).toContain('Last Name');
      expect(headers[3].text()).toContain('Total Todos');
    });

    it('displays doer data in the correct columns', () => {
      const rows = wrapper.findAll('tbody tr');
      expect(rows.length).toBe(5); // Default pagination
      const firstRowCells = rows[0].findAll('td');
      expect(firstRowCells[0].text()).toBe(mockDoers[0].id.toString());
      expect(firstRowCells[1].text()).toBe(mockDoers[0].firstName);
      expect(firstRowCells[2].text()).toBe(mockDoers[0].lastName);
      expect(firstRowCells[3].text()).toBe((mockDoers[0].totalTodos ?? 0).toString());
    });
  });

  describe('Pagination', () => {
    beforeEach(() => {
      wrapper = mount(DoerTable, {
        props: {
          doers: [...mockDoers], // 7 doers
        },
      });
    });

    it('displays only 5 doers per page', () => {
      const rows = wrapper.findAll('tbody tr');
      expect(rows.length).toBe(5);
    });

    it('renders pagination controls when there are multiple pages', () => {
      expect(wrapper.find('.pagination-controls').exists()).toBe(true);
      const pageButtons = wrapper.findAll('.pagination-controls button');
      // Prev, Page 1, Page 2, Next
      expect(pageButtons.length).toBe(4);
    });

    it('updates the displayed doers when navigating to the next page', async () => {
      await wrapper.findAll('.pagination-controls button').at(3)?.trigger('click'); // Next button
      const rows = wrapper.findAll('tbody tr');
      expect(rows.length).toBe(2); // Remaining 2 doers
      expect(rows[0].findAll('td')[0].text()).toBe(mockDoers[5].id.toString());
    });

    it('disables the "previous" button on the first page', () => {
      const prevButton = wrapper.findAll('.pagination-controls button').at(0);
      expect(prevButton?.attributes('disabled')).toBeDefined();
    });

    it('disables the "next" button on the last page', async () => {
      await wrapper.findAll('.pagination-controls button').at(3)?.trigger('click'); // Next button
      const nextButton = wrapper.findAll('.pagination-controls button').at(3);
      expect(nextButton?.attributes('disabled')).toBeDefined();
    });

    it('navigates to a specific page when a page number button is clicked', async () => {
      await wrapper.findAll('.pagination-controls button').at(2)?.trigger('click'); // Page 2 button
      const rows = wrapper.findAll('tbody tr');
      expect(rows.length).toBe(2);
      expect(rows[0].findAll('td')[0].text()).toBe(mockDoers[5].id.toString());
      expect(wrapper.find('.pagination-controls button.active').text()).toBe('2');
    });
  });

  describe('Sorting', () => {
    beforeEach(() => {
      wrapper = mount(DoerTable, {
        props: {
          // Provide a mix to test sorting properly
          doers: [
            { id: 3, firstName: 'Charlie', lastName: 'Brown', totalTodos: 8 },
            { id: 1, firstName: 'Alice', lastName: 'Smith', totalTodos: 5 },
            { id: 2, firstName: 'Bob', lastName: 'Johnson', totalTodos: 3 },
          ],
        },
      });
    });

    it('sorts doers by ID when the ID column header is clicked', async () => {
      const idHeader = wrapper.findAll('th').at(0);
      await idHeader?.trigger('click'); // Ascending
      let cells = wrapper.findAll('tbody tr td:first-child');
      expect(cells[0].text()).toBe('1');
      expect(cells[1].text()).toBe('2');
      expect(cells[2].text()).toBe('3');

      await idHeader?.trigger('click'); // Descending
      cells = wrapper.findAll('tbody tr td:first-child');
      expect(cells[0].text()).toBe('3');
      expect(cells[1].text()).toBe('2');
      expect(cells[2].text()).toBe('1');
    });

    it('sorts doers by First Name when the First Name column header is clicked', async () => {
      const nameHeader = wrapper.findAll('th').at(1);
      await nameHeader?.trigger('click'); // Ascending
      let cells = wrapper.findAll('tbody tr td:nth-child(2)');
      expect(cells[0].text()).toBe('Alice');
      expect(cells[1].text()).toBe('Bob');
      expect(cells[2].text()).toBe('Charlie');

      await nameHeader?.trigger('click'); // Descending
      cells = wrapper.findAll('tbody tr td:nth-child(2)');
      expect(cells[0].text()).toBe('Charlie');
      expect(cells[1].text()).toBe('Bob');
      expect(cells[2].text()).toBe('Alice');
    });

    it('sorts doers by Last Name when the Last Name column header is clicked', async () => {
      const lastNameHeader = wrapper.findAll('th').at(2);
      await lastNameHeader?.trigger('click'); // Ascending
      let cells = wrapper.findAll('tbody tr td:nth-child(3)');
      expect(cells[0].text()).toBe('Brown');
      expect(cells[1].text()).toBe('Johnson');
      expect(cells[2].text()).toBe('Smith');

      await lastNameHeader?.trigger('click'); // Descending
      cells = wrapper.findAll('tbody tr td:nth-child(3)');
      expect(cells[0].text()).toBe('Smith');
      expect(cells[1].text()).toBe('Johnson');
      expect(cells[2].text()).toBe('Brown');
    });

    it('sorts doers by Total Todos when the Total Todos column header is clicked', async () => {
      const todosHeader = wrapper.findAll('th').at(3);
      await todosHeader?.trigger('click'); // Ascending
      let cells = wrapper.findAll('tbody tr td:nth-child(4)');
      expect(cells[0].text()).toBe('3');
      expect(cells[1].text()).toBe('5');
      expect(cells[2].text()).toBe('8');

      await todosHeader?.trigger('click'); // Descending
      cells = wrapper.findAll('tbody tr td:nth-child(4)');
      expect(cells[0].text()).toBe('8');
      expect(cells[1].text()).toBe('5');
      expect(cells[2].text()).toBe('3');
    });

    it('displays sort indicators on column headers', async () => {
      const idHeader = wrapper.findAll('th').at(0);
      await idHeader?.trigger('click');
      expect(idHeader?.text()).toContain('▲'); // Ascending
      await idHeader?.trigger('click');
      expect(idHeader?.text()).toContain('▼'); // Descending
    });
  });
});
