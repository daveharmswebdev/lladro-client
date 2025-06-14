<template>
  <div class="doer-table">
    <h2>Doer List</h2>
    <div v-if="!doers || doers.length === 0" class="no-doers-message">
      <p>You currently do not have any doers.</p>
    </div>
    <table v-else>
      <thead>
        <tr>
          <th @click="sortBy('id')">
            ID
            <span v-if="sortKey === 'id'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
          </th>
          <th @click="sortBy('firstName')">
            First Name
            <span v-if="sortKey === 'firstName'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
          </th>
          <th @click="sortBy('lastName')">
            Last Name
            <span v-if="sortKey === 'lastName'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
          </th>
          <th @click="sortBy('totalTodos')">
            Total Todos
            <span v-if="sortKey === 'totalTodos'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="doer in paginatedDoers" :key="doer.id">
          <td>{{ doer.id }}</td>
          <td>{{ doer.firstName }}</td>
          <td>{{ doer.lastName }}</td>
          <td>{{ doer.totalTodos ?? 0 }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="totalPages > 1" class="pagination-controls">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span v-for="pageNumber in totalPages" :key="pageNumber">
        <button @click="goToPage(pageNumber)" :class="{ active: currentPage === pageNumber }">
          {{ pageNumber }}
        </button>
      </span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Doer } from '@/models/doer.model';
import { ref, computed } from 'vue';

interface Props {
  doers: Doer[];
}

const props = defineProps<Props>();

const currentPage = ref(1);
const itemsPerPage = 5;
const sortKey = ref<keyof Doer | null>(null);
const sortOrder = ref<'asc' | 'desc'>('asc');

const sortedDoers = computed(() => {
  if (!props.doers) return [];
  const doersCopy = [...props.doers];
  if (sortKey.value) {
    doersCopy.sort((a, b) => {
      const valA = a[sortKey.value!];
      const valB = b[sortKey.value!];

      let comparison = 0;
      if (valA === undefined || valA === null) comparison = -1;
      else if (valB === undefined || valB === null) comparison = 1;
      else if (valA < valB) comparison = -1;
      else if (valA > valB) comparison = 1;

      return sortOrder.value === 'asc' ? comparison : -comparison;
    });
  }
  return doersCopy;
});

const totalPages = computed(() => {
  if (!props.doers || props.doers.length === 0) {
    return 1;
  }
  return Math.ceil(props.doers.length / itemsPerPage);
});

const paginatedDoers = computed(() => {
  if (!sortedDoers.value || sortedDoers.value.length === 0) {
    return [];
  }
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return sortedDoers.value.slice(startIndex, endIndex);
});

const sortBy = (key: keyof Doer) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
  currentPage.value = 1; // Reset to first page after sorting
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
</script>

<style scoped>
.doer-table {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.no-doers-message {
  padding: 1rem;
  text-align: center;
  color: #555;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #2f2222;
  cursor: pointer; /* Will be used for sorting later */
}

.pagination-controls {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination-controls button {
  margin: 0 0.25rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  cursor: pointer;
}

.pagination-controls button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.pagination-controls button.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}
</style>
