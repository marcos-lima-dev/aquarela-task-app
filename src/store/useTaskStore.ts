// src/store/useTaskStore.ts
import { create } from "zustand";

export type Task = {
  id: string; title: string; completed: boolean };

type TaskStore = {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  editTask: (id: string, title: string) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [
    { id: "1", title: "Wake Up!", completed: true },
    { id: "2", title: "Daily workout", completed: true },
    { id: "3", title: "Briefing with Lokanaka", completed: false },
    { id: "4", title: "Pitching with John", completed: false },
    { id: "5", title: "Design Landing Page", completed: false },
  ],

  addTask: (title) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { id: crypto.randomUUID(), title, completed: false },
      ],
    })),

  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),

  editTask: (id, title) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, title } : task
      ),
    })),
}));