import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DoerForm from '../DoerForm.vue';

describe('DoerForm.vue', () => {
  const defaultProps = {
    firstName: '',
    lastName: '',
    mode: 'create' as 'create' | 'edit' | undefined,
  };

  it('renders the form in create mode by default', () => {
    const wrapper = mount(DoerForm, { props: { ...defaultProps, mode: undefined } }); // Test default mode
    expect(wrapper.find('button[type="submit"]').text()).toBe('Create');
  });

  it('renders the form in create mode explicitly', () => {
    const wrapper = mount(DoerForm, { props: { ...defaultProps, mode: 'create' } });
    expect(wrapper.find('button[type="submit"]').text()).toBe('Create');
  });

  it('renders the form in edit mode with "Update" button text', () => {
    const wrapper = mount(DoerForm, { props: { ...defaultProps, mode: 'edit' } });
    expect(wrapper.find('button[type="submit"]').text()).toBe('Update');
  });

  it('emits update:firstName when first name input changes', async () => {
    const wrapper = mount(DoerForm, { props: defaultProps });
    const firstNameInput = wrapper.find('input#firstName');
    await firstNameInput.setValue('John');
    expect(wrapper.emitted('update:firstName')).toBeTruthy();
    expect(wrapper.emitted('update:firstName')![0]).toEqual(['John']);
  });

  it('emits update:lastName when last name input changes', async () => {
    const wrapper = mount(DoerForm, { props: defaultProps });
    const lastNameInput = wrapper.find('input#lastName');
    await lastNameInput.setValue('Doe');
    expect(wrapper.emitted('update:lastName')).toBeTruthy();
    expect(wrapper.emitted('update:lastName')![0]).toEqual(['Doe']);
  });

  // Validation Tests
  it('shows error if first name is empty', async () => {
    const wrapper = mount(DoerForm, { props: { ...defaultProps, firstName: '' } });
    await wrapper.vm.$nextTick(); // Allow computed properties to update
    expect(wrapper.find('.error-message').text()).toBe('First Name is Required');
    expect(wrapper.find('button[type="submit"]').attributes('disabled')).toBeDefined();
  });

  it('shows error if first name exceeds 25 characters', async () => {
    const wrapper = mount(DoerForm, {
      props: { ...defaultProps, firstName: 'Abcdefghijklmnopqrstuvwxyz' }, // 26 chars
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.error-message').text()).toBe('25 Character Limit');
    expect(wrapper.find('button[type="submit"]').attributes('disabled')).toBeDefined();
  });

  it('shows error if last name is empty', async () => {
    const wrapper = mount(DoerForm, {
      props: { ...defaultProps, firstName: 'John', lastName: '' },
    });
    await wrapper.vm.$nextTick();
    // Find all error messages and check the relevant one
    const errorMessages = wrapper.findAll('.error-message');
    expect(errorMessages.some(e => e.text() === 'Last Name is Required')).toBe(true);
    expect(wrapper.find('button[type="submit"]').attributes('disabled')).toBeDefined();
  });

  it('shows error if last name exceeds 25 characters', async () => {
    const wrapper = mount(DoerForm, {
      props: { ...defaultProps, firstName: 'John', lastName: 'Abcdefghijklmnopqrstuvwxyz' }, // 26 chars
    });
    await wrapper.vm.$nextTick();
    const errorMessages = wrapper.findAll('.error-message');
    expect(errorMessages.some(e => e.text() === '25 Character Limit')).toBe(true);
    expect(wrapper.find('button[type="submit"]').attributes('disabled')).toBeDefined();
  });

  it('does not show errors and enables button with valid inputs', async () => {
    const wrapper = mount(DoerForm, {
      props: { ...defaultProps, firstName: 'John', lastName: 'Doe' },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.error-message').exists()).toBe(false);
    expect(wrapper.find('button[type="submit"]').attributes('disabled')).toBeUndefined();
  });

  // Submit Logic
  it('emits submit-form when form is valid and submitted', async () => {
    const wrapper = mount(DoerForm, {
      props: { ...defaultProps, firstName: 'Valid', lastName: 'Name' },
    });
    await wrapper.vm.$nextTick(); // Ensure button is enabled
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.emitted('submit-form')).toBeTruthy();
  });

  it('does not emit submit-form if form is invalid (e.g., first name empty)', async () => {
    const wrapper = mount(DoerForm, {
      props: { ...defaultProps, firstName: '', lastName: 'Name' },
    });
    await wrapper.vm.$nextTick(); // Ensure button is disabled
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.emitted('submit-form')).toBeFalsy();
  });

  it('does not emit submit-form if form is invalid (e.g., last name too long)', async () => {
    const wrapper = mount(DoerForm, {
      props: {
        ...defaultProps,
        firstName: 'Valid',
        lastName: 'ThisNameIsWayTooLongAndExceedsTheLimit',
      },
    });
    await wrapper.vm.$nextTick(); // Ensure button is disabled
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.emitted('submit-form')).toBeFalsy();
  });
});
