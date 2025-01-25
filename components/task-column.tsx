"use client";

import { Card } from "@/components/ui/card";
import { Task } from "@/app/tasks/page";
import { TaskCard } from "./task-card";

interface TaskColumnProps {
  id: Task["status"];
  title: string;
  icon: string;
  tasks: Task[];
  onUpdateStatus: (taskId: string, status: Task["status"]) => void;
  onUpdatePriority: (taskId: string, priority: Task["priority"]) => void;
  onDeleteTask?: (taskId: string) => void;
  onUpdateTask?: (taskId: string, title: string, description: string) => void;
}

export function TaskColumn({
  id,
  title,
  icon,
  tasks,
  onUpdateStatus,
  onUpdatePriority,
  onDeleteTask,
  onUpdateTask,
}: TaskColumnProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl" role="img" aria-label={title}>
          {icon}
        </span>
        <h2 className="font-semibold text-xl">{title}</h2>
        <span className="ml-auto bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
          {tasks.length}
        </span>
      </div>
      <Card className="flex-1 p-6 bg-card/50 backdrop-blur-sm">
        <div className="space-y-6">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdatePriority={onUpdatePriority}
              onUpdateStatus={onUpdateStatus}
              onDeleteTask={onDeleteTask}
              onUpdateTask={onUpdateTask}
            />
          ))}
          {tasks.length === 0 && (
            <div className="h-[250px] flex items-center justify-center text-muted-foreground text-lg">
              No tasks yet
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
