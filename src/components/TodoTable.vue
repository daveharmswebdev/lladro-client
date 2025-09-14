<script lang="ts" setup>
import { defineProps } from 'vue';
import type { Todo } from '../models/todo.model';

defineProps<{ todos: Todo[] }>();
</script>

<template>
  <div>
    <table v-if="todos && todos.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Doer ID</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in todos" :key="todo.id">
          <td>{{ todo.id }}</td>
          <td>{{ todo.name }}</td>
          <td>{{ todo.description }}</td>
          <td>{{ todo.status }}</td>
          <td>{{ todo.createdAt }}</td>
          <td>{{ todo.updatedAt }}</td>
          <td>{{ todo.doerId }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else class="no-todos">No Todos</div>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f2f2f2;
  color: black;
}
.no-todos {
  text-align: center;
  color: #888;
  padding: 2em;
}
</style>
