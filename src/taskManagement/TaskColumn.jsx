import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const TaskColumn = ({ category, tasks }) => {
  const { setNodeRef } = useDroppable({
    id: category, // ✅ Category is the drop target ID
  });

  return (
    <div
      ref={setNodeRef} // ✅ Makes this div a valid drop target
      id={category}
      className="bg-gray-600 p-4 rounded-lg min-h-[200px]"
    >
      <h2 className="text-lg font-semibold mb-2 capitalize">{category}</h2>
      {tasks.map((task) => (
        <TaskCard key={task._id.toString()} task={task} />
      ))}
    </div>
  );
};
export default TaskColumn;