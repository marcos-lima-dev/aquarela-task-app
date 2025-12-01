// src/app/page.tsx
import Header from "@/components/Header";
import { TaskList } from "@/components/TaskList";
import TaskSheet from "@/components/TaskSheet";

export default function Home() {
  return (
    <>
      {/* Fundo branco fixo */}
      <div className="fixed inset-0 bg-white dark:bg-gray-950" />

      {/* Conteúdo principal com safe-area perfeita */}
      <main className="relative mx-auto max-w-md min-h-screen flex flex-col pb-28">
        <div className="px-6 pt-8 pb-4">
          <Header />
        </div>

        <div className="flex-1 overflow-y-auto px-6 -mx-6">
          <TaskList />
        </div>

        {/* O Sheet precisa estar FORA do scroll e com z-index alto */}
        <TaskSheet />
      </main>
    </>
  );
}