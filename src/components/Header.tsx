// src/components/Header.tsx

"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { useTaskStore } from "@/store/useTaskStore";

export default function Header() {
  // Data fixa do Figma (pode deixar assim ou usar new Date() depois)
  const today = new Date("2023-06-09");

  // Pega as tarefas do Zustand e calcula o contador em tempo real
  const tasks = useTaskStore((state) => state.tasks);
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  return (
    <header className="flex items-center justify-between mb-8">
      {/* Esquerda: Data + Título */}
      <div>
        <time className="text-sm text-gray-500 leading-tight">
          {format(today, "EEEE")}
          <br />
          <span className="text-lg font-semibold text-gray-900">
            {format(today, "dd MMMM yyyy")}
          </span>
        </time>

        <h1 className="text-2xl font-bold text-gray-900 mt-6">Task List</h1>

        {/* Contador agora é dinâmico e atualiza sozinho */}
        <p className="text-sm text-purple-600 font-medium mt-2">
          {completedCount}/{totalCount} Task{totalCount !== 1 ? "s" : ""} finished
        </p>
      </div>

      {/* Direita: Avatar */}
      <Avatar className="h-12 w-12 ring-4 ring-white shadow-lg">
        <AvatarImage src="/avatar.jpg" alt="User" />
        <AvatarFallback className="bg-gray-200 text-gray-600 text-lg font-medium">
          MN
        </AvatarFallback>
      </Avatar>
    </header>
  );
}