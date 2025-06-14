export interface Doer {
  id: number;
  firstName: string;
  lastName: string;
  totalTodos?: number; // Optional for now, as it might not always be present/calculated
}
