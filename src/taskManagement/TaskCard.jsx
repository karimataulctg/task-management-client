import { useDraggable } from "@dnd-kit/core";

const TaskCard = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id.toString(), // ✅ Ensure ID is a string
  });

  // 🎨 Ensure category is normalized for matching
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
      <p className="text-sm text-gray-600">{new Date(task.timestamp).toLocaleString()}</p>

      {/* ✅ Dynamic Button with Proper Category Matching */}
      <p className={`btn text-sm px-3 py-1 rounded-xl ${getCategoryStyle(task.category)}`}>
        {task.category}
      </p>
    </div>
  );
};

export default TaskCard;
