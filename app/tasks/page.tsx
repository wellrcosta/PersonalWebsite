"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { TaskCard } from "@/components/task-card";
import { TaskColumn } from "@/components/task-column";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { Card } from "@/components/ui/card";

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "doing" | "done" | "ideas";
};

export default function Tasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as Task["priority"],
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [user]);

  async function fetchTasks() {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching tasks:", error);
      return;
    }

    setTasks(data || []);
    setLoading(false);
  }

  const updateTaskStatus = async (
    taskId: string,
    newStatus: Task["status"]
  ) => {
    if (!user) return;

    const { error } = await supabase
      .from("tasks")
      .update({ status: newStatus })
      .eq("id", taskId);

    if (error) {
      console.error("Error updating task status:", error);
      return;
    }

    await fetchTasks();
  };

  const updateTaskPriority = async (
    taskId: string,
    priority: Task["priority"]
  ) => {
    if (!user) return;

    const { error } = await supabase
      .from("tasks")
      .update({ priority })
      .eq("id", taskId);

    if (error) {
      console.error("Error updating task priority:", error);
      return;
    }

    await fetchTasks();
  };

  const updateTask = async (
    taskId: string,
    title: string,
    description: string
  ) => {
    if (!user) return;

    const { error } = await supabase
      .from("tasks")
      .update({ title, description })
      .eq("id", taskId);

    if (error) {
      console.error("Error updating task:", error);
      return;
    }

    await fetchTasks();
  };

  const deleteTask = async (taskId: string) => {
    if (!user) return;

    const { error } = await supabase.from("tasks").delete().eq("id", taskId);

    if (error) {
      console.error("Error deleting task:", error);
      return;
    }

    await fetchTasks();
  };

  const handleAddTask = async () => {
    if (!user || !newTask.title.trim()) return;

    const { error } = await supabase.from("tasks").insert([
      {
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        status: "ideas",
        user_id: user.id,
      },
    ]);

    if (error) {
      console.error("Error creating task:", error);
      return;
    }

    setNewTask({
      title: "",
      description: "",
      priority: "medium",
    });
    setIsDialogOpen(false);
    await fetchTasks();
  };

  const columns: { id: Task["status"]; title: string; icon: string }[] = [
    { id: "ideas", title: "Ideas", icon: "💡" },
    { id: "doing", title: "In Progress", icon: "🔄" },
    { id: "done", title: "Completed", icon: "✅" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h1 className="text-4xl font-bold tracking-tight">
                Task Manager
              </h1>
              <p className="text-muted-foreground">
                Track and organize your development tasks
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="gap-2" disabled={!user}>
                  <PlusCircle className="w-5 h-5" aria-hidden="true" />
                  Add Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter task title"
                      value={newTask.title}
                      onChange={(e) =>
                        setNewTask({ ...newTask, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter task description"
                      value={newTask.description}
                      onChange={(e) =>
                        setNewTask({ ...newTask, description: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <RadioGroup
                      value={newTask.priority}
                      onValueChange={(value) =>
                        setNewTask({
                          ...newTask,
                          priority: value as Task["priority"],
                        })
                      }
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="low" />
                        <Label htmlFor="low">Low</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="high" />
                        <Label htmlFor="high">High</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <Button onClick={handleAddTask} className="w-full">
                    Create Task
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <TaskColumn
              key={column.id}
              id={column.id}
              title={column.title}
              icon={column.icon}
              tasks={tasks.filter((task) => task.status === column.id)}
              onUpdateStatus={updateTaskStatus}
              onUpdatePriority={updateTaskPriority}
              onDeleteTask={deleteTask}
              onUpdateTask={updateTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
