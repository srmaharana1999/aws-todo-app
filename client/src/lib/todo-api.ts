import type { TodoFormTypes } from "../components/TodoEntryModal/todo.schema";
import { api } from "./api";

const BASE_URL = "/api/todos";

export interface TodoType {
  category: string;
  completedAt: string;
  createdAt: string;
  description: string;
  dueDate: string;
  id: string;
  priority: string;
  status: string;
  title: string;
  updatedAt: string;
}

export const todoApi = {
  getAll: () => api<TodoType[]>(BASE_URL),
  getById: (id: string) => api<TodoType>(`${BASE_URL}/${id}`),
  addTodo: async (data: TodoFormTypes) =>
    api<TodoFormTypes>(`${BASE_URL}`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateTodo: async (id: string, data: Partial<TodoFormTypes>) =>
    api<TodoFormTypes>(`${BASE_URL}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  deleteTodo: async (id: string) =>
    api<TodoFormTypes>(`${BASE_URL}/${id}`, {
      method: "DELETE",
    }),
};
