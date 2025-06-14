<template>
  <nav class="navbar">
    <div class="navbar-links">
      <router-link to="/">Home</router-link>
      <router-link to="/doers">Doers</router-link>
      <router-link to="/todos">Todos</router-link>
      <router-link to="/regions">Regions</router-link>
    </div>
    <div class="navbar-user">
      <span>User Name</span>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa;
  padding: 0.5rem 1rem;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #dee2e6;
}

.navbar-links a {
  margin-right: 1rem;
  text-decoration: none;
  color: #007bff;
}

.navbar-links a:hover {
  text-decoration: underline;
}

.navbar-links a.router-link-exact-active {
  font-weight: bold;
  color: #0056b3;
}

.navbar-user span {
  font-style: italic;
}
</style>
