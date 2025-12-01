// src/components/TaskList.tsx
"use client";

import { TaskCard } from "./TaskCard"; // ← agora importa corretamente
import { Skeleton } from "@/components/ui/skeleton";
import { useTaskStore } from "@/store/useTaskStore";
import { motion, AnimatePresence } from "framer-motion";

export function TaskList() {
  const tasks = useTaskStore((state) => state.tasks);

  // Mostra skeleton só na primeira renderização (quando ainda não tem tarefas)
  const isFirstLoad = tasks.length === 0;

  if (isFirstLoad) {
    return (
      <div className="-mx-6 px-6 space-y-3 pt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-2xl bg-purple-200/30" />
        ))}
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="-mx-6 px-6"
    >
      <AnimatePresence mode="popLayout">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -150, scale: 0.95 }}
            transition={{
              layout: { duration: 0.3 },
              opacity: { duration: 0.3 },
              delay: index * 0.06,
            }}
            className="mb-3"
          >
            <TaskCard task={task} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.section>
  );
}