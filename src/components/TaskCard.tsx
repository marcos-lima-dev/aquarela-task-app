"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTaskStore, type Task } from "@/store/useTaskStore";
import { openTaskSheetForEdit } from "./TaskSheet"; // ← ESSA É A LINHA QUE FALTAVA!

export function TaskCard({ task }: { task: Task }) {
  const toggleTask = useTaskStore((state) => state.toggleTask);

  return (
    <div
      className={cn(
        "group flex items-center justify-between p-4 mb-3 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
        task.completed && "opacity-70"
      )}
    >
      <div
        className="flex items-center gap-4 flex-1 cursor-pointer"
        onClick={() => toggleTask(task.id)}
      >
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => toggleTask(task.id)}
          className="w-6 h-6 rounded-lg border-2 border-white data-[state=checked]:bg-white data-[state=checked]:text-purple-600"
        />

        <span
          className={cn(
            "text-lg font-medium transition-all",
            task.completed && "line-through opacity-80"
          )}
        >
          {task.title}
        </span>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          openTaskSheetForEdit(task); // ← agora funciona perfeitamente!
        }}
        className="ml-3 p-1 -mr-1 rounded-full hover:bg-white/10 transition-colors"
        aria-label="Edit task"
      >
        <ChevronRight className="w-6 h-6 text-white/80 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}