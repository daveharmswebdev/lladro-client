<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="firstName">First Name:</label>
      <input type="text" id="firstName" :value="firstName" @input="handleFirstNameInput" />
      <div v-if="firstNameError" class="error-message">{{ firstNameError }}</div>
    </div>
    <div>
      <label for="lastName">Last Name:</label>
      <input type="text" id="lastName" :value="lastName" @input="handleLastNameInput" />
      <div v-if="lastNameError" class="error-message">{{ lastNameError }}</div>
    </div>
    <button type="submit" :disabled="isFormInvalid">
      {{ mode === 'edit' ? 'Update' : 'Create' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  firstName: string;
  lastName: string;
  mode?: 'create' | 'edit';
}>();

const emit = defineEmits<{
  (e: 'update:firstName', value: string): void;
  (e: 'update:lastName', value: string): void;
  (e: 'submit-form', data: { firstName: string; lastName: string }): void;
}>();

const handleFirstNameInput = (event: Event) => {
  emit('update:firstName', (event.target as HTMLInputElement).value);
};

const handleLastNameInput = (event: Event) => {
  emit('update:lastName', (event.target as HTMLInputElement).value);
};

const firstNameError = computed(() => {
  if (!props.firstName) return 'First Name is Required';
  if (props.firstName.length > 25) return '25 Character Limit';
  return '';
});

const lastNameError = computed(() => {
  if (!props.lastName) return 'Last Name is Required'; // Corrected error message
  if (props.lastName.length > 25) return '25 Character Limit';
  return '';
});

const isFormInvalid = computed(() => {
  return !!firstNameError.value || !!lastNameError.value;
});

const handleSubmit = () => {
  if (!isFormInvalid.value) {
    emit('submit-form', { firstName: props.firstName, lastName: props.lastName });
  }
};
</script>

<style scoped>
form div {
  margin-bottom: 10px;
}
label {
  margin-right: 5px;
  display: block; /* Ensure labels are on their own line for clarity with errors */
}
input {
  margin-bottom: 5px; /* Space between input and potential error message */
}
.error-message {
  color: red;
  font-size: 0.9em;
  margin-bottom: 5px;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
