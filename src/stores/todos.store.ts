import { defineStore } from 'pinia';
import type { Todo } from '../models/todo.model';
import { createEntityAdapter, type EntityState } from './entity-adapter';

const API_BASE_URL = 'http://localhost:3000/api/todos';

const todosAdapter = createEntityAdapter<Todo>({
  sortComparer: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
});

const todosSelectors = todosAdapter.getSelectors();

interface State {
  todos: EntityState<Todo>;
  loading: boolean;
  error: string | null;
}

export const useTodosStore = defineStore('todos', {
  state: (): State => ({
    todos: todosAdapter.getInitialState(),
    loading: false,
    error: null,
  }),
  getters: {
    allTodos: state => todosSelectors.selectAll(state.todos),
    findTodoById: state => (id: string) => todosSelectors.selectById(state.todos, id),
  },
  actions: {
    async getManyTodos() {
      this.loading = true;
      this.error = null;
      try {
        const res = await fetch(API_BASE_URL);
        if (!res.ok) throw new Error('Failed to fetch todos');
        const todos = await res.json();
        this.todos = todosAdapter.setAll(this.todos, todos);
      } catch (err: any) {
        this.error = err.message || 'Unknown error';
      } finally {
        this.loading = false;
      }
    },

    async getTodoById(id: string) {
      this.loading = true;
      this.error = null;
      try {
        const res = await fetch(`${API_BASE_URL}/${id}`);
        if (!res.ok) throw new Error('Failed to fetch todo');
        const todo = (await res.json()) as Todo;
        this.todos = todosAdapter.upsertOne(this.todos, todo);
        return todo;
      } catch (err: any) {
        this.error = err.message || 'Unknown error';
        return null;
      } finally {
        this.loading = false;
      }
    },

    async createTodo(todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) {
      this.loading = true;
      this.error = null;
      try {
        const res = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(todo),
        });
        if (!res.ok) throw new Error('Failed to create todo');
        const newTodo = await res.json();
        this.todos = todosAdapter.addOne(this.todos, newTodo);
        return newTodo;
      } catch (err: any) {
        this.error = err.message || 'Unknown error';
        return null;
      } finally {
        this.loading = false;
      }
    },

    async updateTodo(id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>>) {
      this.loading = true;
      this.error = null;
      try {
        const res = await fetch(`${API_BASE_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        });
        if (!res.ok) throw new Error('Failed to update todo');
        const updated = await res.json();
        this.todos = todosAdapter.updateOne(this.todos, { id: updated.id, changes: updated });
        return updated;
      } catch (err: any) {
        this.error = err.message || 'Unknown error';
        return null;
      } finally {
        this.loading = false;
      }
    },

    async deleteTodo(id: string) {
      this.loading = true;
      this.error = null;
      try {
        const res = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete todo');
        this.todos = todosAdapter.removeOne(this.todos, id);
        return true;
      } catch (err: any) {
        this.error = err.message || 'Unknown error';
        return false;
      } finally {
        this.loading = false;
      }
    },
  },
});
