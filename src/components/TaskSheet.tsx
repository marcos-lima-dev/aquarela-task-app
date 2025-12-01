"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useTaskStore, type Task } from "@/store/useTaskStore";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Variável global para o TaskCard abrir o sheet em modo edição
let openEditTask: ((task: Task) => void) | null = null;

export default function TaskSheet() {
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [title, setTitle] = useState("");

  const { addTask, editTask, tasks } = useTaskStore();

  const handleSave = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    if (editingTask) {
      editTask(editingTask.id, trimmedTitle);
      toast.success("Task updated!", {
        description: `"${trimmedTitle}" was edited.`,
      });
    } else {
      addTask(trimmedTitle);

      toast.success("Task created!", {
        description: `"${trimmedTitle}" added to your list.`,
        action: {
          label: "Undo",
          onClick: () => {
            const latest = tasks[tasks.length - 1];
            if (latest?.title === trimmedTitle) {
              useTaskStore.setState((state) => ({
                tasks: state.tasks.filter((t) => t.id !== latest.id),
              }));
              toast("Undo complete", { description: "Task removed." });
            }
          },
        },
      });
    }

    // Reset e fecha
    setTitle("");
    setEditingTask(null);
    setOpen(false);
  };

  const openCreate = () => {
    setEditingTask(null);
    setTitle("");
    setOpen(true);
  };

  const openEdit = (task: Task) => {
    setEditingTask(task);
    setTitle(task.title);
    setOpen(true);
  };

  openEditTask = openEdit;

  return (
    <>
      {/* BOTÃO FLUTUANTE COM ESPAÇO PERFEITO */}
      <Button
        onClick={openCreate}
        className={cn(
          "fixed bottom-12 right-6 z-50 h-14 w-14 rounded-full shadow-2xl", // ← bottom-12 = 48px de distância
          "bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800",
          "text-white p-0 transition-all duration-300 hover:scale-110 hover:shadow-purple-500/30",
          open && "rotate-45"
        )}
        aria-label="Create new task"
      >
        <Plus className="h-7 w-7" />
        <span className="sr-only">Create task</span>
      </Button>

      {/* BOTTOM SHEET COM Z-INDEX ALTO */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          className="h-[85vh] rounded-t-3xl z-50 bg-white dark:bg-gray-950"
        >
          {/* Puxador */}
          <div className="mx-auto w-16 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mt-3 mb-6" />

          <SheetHeader className="mb-8 text-center">
            <SheetTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              {editingTask ? "Edit Task" : "Create Task"}
            </SheetTitle>
          </SheetHeader>

          <div className="px-6 space-y-6">
            <div>
              <label htmlFor="task-title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Task title
              </label>
              <Input
                id="task-title"
                placeholder="Type here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSave()}
                className="mt-2 h-14 text-lg rounded-2xl border-gray-200 dark:border-gray-700 focus-visible:ring-purple-500"
                autoFocus
              />
            </div>
          </div>

          {/* Botão fixo no fundo do sheet */}
          <div className="absolute bottom-8 left-6 right-6">
            <Button
              onClick={handleSave}
              disabled={!title.trim()}
              className="w-full h-14 rounded-2xl text-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:opacity-50"
            >
              {editingTask ? "Save Changes" : " task"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

// Função pública pro TaskCard usar
export const openTaskSheetForEdit = (task: Task) => {
  openEditTask?.(task);
};