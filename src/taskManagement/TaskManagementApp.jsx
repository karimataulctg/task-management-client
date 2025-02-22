import React, { useState, useEffect } from "react";
import axios from "axios";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import TaskCard from "./TaskCard";
import TaskColumn from "./TaskColumn";

const TaskManagementApp = () => {
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get("https://task-management-server-zeta-six.vercel.app/tasks")
      .then((response) => {
        console.log("Fetched raw tasks from backend:", response.data);
  
        // Ensure response is an array
        const tasksArray = Array.isArray(response.data)
          ? response.data
          : response.data.tasks || [];
  
        console.log("Processed tasks array:", tasksArray);
  
        if (!Array.isArray(tasksArray)) {
          console.error("Invalid response format:", response.data);
          return;
        }
  
        // Log category values before filtering
        tasksArray.forEach((task) =>
          console.log(`Task: ${task.title}, Category: "${task.category}"`)
        );
  
        // Normalize category names
        const categorizedTasks = {
          todo: tasksArray.filter(
            (task) =>
              task.category?.trim().toLowerCase() === "to-do" ||
              task.category?.trim().toLowerCase() === "todo"
          ),
          inProgress: tasksArray.filter(
            (task) =>
              task.category?.trim().toLowerCase() === "in-progress" ||
              task.category?.trim().toLowerCase() === "inprogress"
          ),
          done: tasksArray.filter(
            (task) =>
              task.category?.trim().toLowerCase() === "done"
          ),
        };
  
        console.log("Categorized tasks:", categorizedTasks);
  
        setTasks(categorizedTasks);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setTasks({ todo: [], inProgress: [], done: [] });
      });
  }, []);
  
  

  const addTask = () => {
    if (!newTask.trim() || !description.trim()) return;

    const task = {
      title: newTask.trim(),
      description: description.trim(), // ✅ Fix here
      timestamp: new Date().toISOString(),
      category: "To-Do",
      status: "incomplete",
    };

    axios
      .post("https://task-management-server-zeta-six.vercel.app/tasks", task)
      .then((response) => {
        console.log("Task added:", response.data);

        setTasks((prevTasks) => ({
          ...prevTasks,
          todo: [...prevTasks.todo, { ...task, _id: response.data.insertedId }],
        }));

        setNewTask(""); // ✅ Clear input field
        setDescription(""); // ✅ Clear description
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const onUpdateTask = (taskId, newTitle, newDescription) => {
    axios
      .put(`https://task-management-server-zeta-six.vercel.app/tasks/${taskId}`, {
        title: newTitle,
        description: newDescription,
      })
      .then((response) => {
        // Update state: find and update the task in the right category
        setTasks((prevTasks) => {
          const updatedTasks = { ...prevTasks };
          Object.keys(updatedTasks).forEach((category) => {
            updatedTasks[category] = updatedTasks[category].map((task) => {
              // Compare as strings if needed
              if (task._id.toString() === taskId.toString()) {
                return { ...task, title: newTitle, description: newDescription };
              }
              return task;
            });
          });
          return updatedTasks;
        });
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  // Function to delete a task
  const onDeleteTask = (taskId) => {
    axios
      .delete(`https://task-management-server-zeta-six.vercel.app/tasks/${taskId}`)
      .then((response) => {
        // Remove the task from state
        setTasks((prevTasks) => {
          const updatedTasks = { ...prevTasks };
          Object.keys(updatedTasks).forEach((category) => {
            updatedTasks[category] = updatedTasks[category].filter(
              (task) => task._id.toString() !== taskId.toString()
            );
          });
          return updatedTasks;
        });
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };


  const onDragEnd = (event) => {
    const { active, over } = event;
  
    console.log("🔄 Drag Event:", event);
    console.log("🟢 Active Task ID:", active.id);
    console.log("🟡 Over Target ID:", over ? over.id : "None");
  
    if (!over) {
      console.warn("⚠️ Task dropped outside a valid category!");
      return;
    }
  
    let sourceCategory = null;
    let destinationCategory = over.id; // Target drop column
  
    // Find the source category
    for (const category in tasks) {
      if (tasks[category].some((task) => task._id.toString() === active.id)) {
        sourceCategory = category;
        break;
      }
    }
  
    console.log("📌 Source Category:", sourceCategory);
    console.log("📌 Destination Category:", destinationCategory);
  
    if (!sourceCategory || sourceCategory === destinationCategory) return;
  
    let movedTask = tasks[sourceCategory].find((task) => task._id.toString() === active.id);
    if (!movedTask) return;
  
    // Update state
    let newSourceList = tasks[sourceCategory].filter((task) => task._id.toString() !== active.id);
    let newDestinationList = [...tasks[destinationCategory], { ...movedTask, category: destinationCategory }];
  
    setTasks((prev) => ({
      ...prev,
      [sourceCategory]: newSourceList,
      [destinationCategory]: newDestinationList,
    }));
  
    // Update backend
    axios
      .put(`https://task-management-server-zeta-six.vercel.app/tasks/${movedTask._id}`, { category: destinationCategory })
      .then(() => console.log(`✅ Task moved to ${destinationCategory}`))
      .catch((error) => console.error("❌ Error updating task:", error));
  };
  
  
  

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Management App</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 flex-1"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter task title"
        />
        <input
          type="text"
          className="border p-2 flex-1"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
        />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={addTask}>
          Add Task
        </button>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
  <div className="grid grid-cols-3 gap-4">
    {Object.keys(tasks).map((category) => (
      <SortableContext
        key={category}
        items={tasks[category].map((task) => task._id.toString())}
        strategy={verticalListSortingStrategy}
      >
        <TaskColumn category={category} tasks={tasks[category]} />
      </SortableContext>
    ))}
  </div>
</DndContext>


    </div>
  );
};

export default TaskManagementApp;
