export interface Todo {
  id: string;
  name: string;
  description: string;
  status: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  doerId: number;
}
