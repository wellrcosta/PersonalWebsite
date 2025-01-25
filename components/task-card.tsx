"use client";

import { Card } from "@/components/ui/card";
import { Task } from "@/app/tasks/page";
import { useAuth } from "@/lib/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface TaskCardProps {
  task: Task;
  onUpdatePriority: (taskId: string, priority: Task["priority"]) => void;
  onUpdateStatus: (taskId: string, status: Task["status"]) => void;
  onDeleteTask?: (taskId: string) => void;
  onUpdateTask?: (taskId: string, title: string, description: string) => void;
}

const priorityConfig = {
  low: {
    label: "Low Priority",
    className: "bg-green-500/10 text-green-700 dark:text-green-400",
    icon: "🟢",
  },
  medium: {
    label: "Medium Priority",
    className: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    icon: "🟡",
  },
  high: {
    label: "High Priority",
    className: "bg-red-500/10 text-red-700 dark:text-red-400",
    icon: "🔴",
  },
};

const statusConfig = {
  doing: { label: "Move to In Progress", icon: "🔄" },
  done: { label: "Move to Completed", icon: "✅" },
  ideas: { label: "Move to Ideas", icon: "💡" },
};

export function TaskCard({
  task,
  onUpdatePriority,
  onUpdateStatus,
  onDeleteTask,
  onUpdateTask,
}: TaskCardProps) {
  const { user } = useAuth();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
  });

  const handleEdit = () => {
    if (onUpdateTask) {
      onUpdateTask(task.id, editedTask.title, editedTask.description);
      setIsEditDialogOpen(false);
    }
  };

  return (
    <Card className="p-4 hover:shadow-md transition-all duration-200 h-[200px] flex flex-col group">
      <div className="flex-1 mb-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-base">{task.title}</h3>
          {user && (
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Dialog
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={editedTask.title}
                        onChange={(e) =>
                          setEditedTask({
                            ...editedTask,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={editedTask.description}
                        onChange={(e) =>
                          setEditedTask({
                            ...editedTask,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <Button onClick={handleEdit} className="w-full">
                      Save Changes
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              {onDeleteTask && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onDeleteTask(task.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              )}
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {task.description}
        </p>
      </div>
      <div className="flex justify-between items-center gap-2">
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="h-9">
                Move Task
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[160px]">
              {Object.entries(statusConfig).map(([key, config]) => (
                <DropdownMenuItem
                  key={key}
                  onClick={() => onUpdateStatus(task.id, key as Task["status"])}
                  className="gap-2"
                >
                  <span role="img" aria-hidden="true">
                    {config.icon}
                  </span>
                  {config.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={`${
                priorityConfig[task.priority].className
              } border-none h-9 ${!user && "w-full"}`}
            >
              <span className="mr-2" role="img" aria-hidden="true">
                {priorityConfig[task.priority].icon}
              </span>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            {Object.entries(priorityConfig).map(([key, config]) => (
              <DropdownMenuItem
                key={key}
                onClick={() =>
                  onUpdatePriority(task.id, key as Task["priority"])
                }
                className="gap-2"
                disabled={!user}
              >
                <span role="img" aria-hidden="true">
                  {config.icon}
                </span>
                {config.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
}
