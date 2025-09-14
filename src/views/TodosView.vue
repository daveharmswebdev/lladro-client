<template>
  <div class="todos-view">
    <h1>Todos</h1>
    <TodoTable :todos="allTodos" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useTodosStore } from '../stores/todos.store';
import TodoTable from '../components/TodoTable.vue';

const todosStore = useTodosStore();
const { allTodos } = storeToRefs(todosStore);

onMounted(() => {
  todosStore.getManyTodos();
});
</script>

<style scoped>
.todos-view {
  padding: 1rem;
}
</style>
