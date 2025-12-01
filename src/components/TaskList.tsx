"use client";

import { TaskCard } from "./TaskCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useTaskStore } from "@/store/useTaskStore";
import { motion, AnimatePresence } from "framer-motion";

export function TaskList() {
  const tasks = useTaskStore((state) => state.tasks);
  const isLoading = tasks.length === 0; // simula loading na primeira vez

  if (isLoading) {
    return (
      <div className="-mx-6 px-6 space-y-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-2xl" />
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
      <AnimatePresence>
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ delay: index * 0.05 }}
          >
            <TaskCard task={task} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.section>
  );
}