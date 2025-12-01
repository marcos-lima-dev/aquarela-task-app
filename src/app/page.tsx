import Header from "@/components/Header";
import { TaskList } from "@/components/TaskList";
import TaskSheet from "@/components/TaskSheet";

export default function Home() {
  return (
    <main className="mx-auto max-w-md px-6 py-8 min-h-screen bg-white relative pb-32">
      <Header />
      <TaskList />
      <TaskSheet />
    </main>
  );
}