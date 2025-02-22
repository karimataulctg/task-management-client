import { useDraggable } from "@dnd-kit/core";

const TaskCard = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id.toString(), // ✅ Ensure ID is a string
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : "none",
      }}
      className="bg-white p-4 rounded shadow mb-2 cursor-pointer"
    >
      <h3 className="text-lg text-black font-bold">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <p className="text-sm text-gray-600">{task.timestamp}</p>
    </div>
  );
};

export default TaskCard;
