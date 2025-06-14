<template>
  <main>
    <h1>Create a New Doer</h1>
    <DoerForm
      v-model:firstName="firstName"
      v-model:lastName="lastName"
      @submit-form="handleCreateDoer"
    />
    <div v-if="submittedDoer">
      <h2>Submitted Doer:</h2>
      <p>First Name: {{ submittedDoer.firstName }}</p>
      <p>Last Name: {{ submittedDoer.lastName }}</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DoerForm from '@/components/DoerForm.vue';
import type { Doer } from '@/models/doer.model';

const firstName = ref('');
const lastName = ref('');
const submittedDoer = ref<Omit<Doer, 'id'> | null>(null);

const handleCreateDoer = () => {
  if (firstName.value.trim() && lastName.value.trim()) {
    submittedDoer.value = {
      firstName: firstName.value,
      lastName: lastName.value,
    };
    // Reset form fields
    firstName.value = '';
    lastName.value = '';
  }
};
</script>
