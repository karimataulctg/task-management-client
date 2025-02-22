import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { FaEdit, FaTrash } from "react-icons/fa";

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id.toString(), // Ensure ID is a string
  });

  // Local state for editing mode
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  // Normalize category for button style
  const getCategoryStyle = (category) => {
    const normalizedCategory = category?.trim().toLowerCase();

    switch (normalizedCategory) {
      case "todo":
        return "bg-red-500 text-white";
      case "inprogress":
        return "bg-blue-500 text-white";
      case "done":
        return "bg-green-500 text-white";
      default:
        return "bg-red-500 text-white";
    }
  };

  // Save changes for edit
  const handleSave = () => {
    // Call the onUpdate callback provided by parent component
    onUpdate(task._id, editedTitle, editedDescription);
    setIsEditing(false);
  };

  // Call the onDelete callback provided by parent component
  const handleDelete = () => {
    onDelete(task._id);
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : "none",
      }}
      className="relative bg-white p-4 rounded shadow mb-2 cursor-pointer"
    >
      {/* Edit & Delete icons at top-right corner */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="text-gray-500 hover:text-gray-700"
          title="Edit"
        >
          <FaEdit />
        </button>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700"
          title="Delete"
        >
          <FaTrash />
        </button>
      </div>

      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full border p-1 mb-2"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full border p-1 mb-2"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="btn btn-success text-sm px-3 py-1"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-secondary text-sm px-3 py-1"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-lg text-black font-bold">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
          <p className="text-sm text-gray-600">
            {new Date(task.timestamp).toLocaleString()}
          </p>
          <p
            className={`btn text-sm px-3 py-1 rounded-xl ${getCategoryStyle(
              task.category
            )}`}
          >
            {task.category}
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
