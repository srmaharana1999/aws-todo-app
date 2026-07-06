import { BiEdit, BiTrash } from "react-icons/bi";
import { IoIosEye } from "react-icons/io";
import type { TodoType } from "../lib/todo-api";

interface TodoBarProps {
  todoData: TodoType;
  onEdit: () => void;
  onView: () => void;
  onDelete: () => void;
  index: number;
}

const TodoBar = ({ onEdit, onView, todoData, index, onDelete }: TodoBarProps) => {
  const due = todoData.dueDate.split("T")[0];
  return (
    <div
      className="min-h-16 px-8 bg-white hover:bg-sky-50 grid grid-cols-[80px_1.5fr_0.6fr_0.4fr_80px_0.5fr_65px_60px_80px] place-items-center p-4 "
    >
      <p>{index}</p>
      <h3 className="text-base font-medium whitespace-nowrap">
        {todoData.title}
      </h3>
      <h4 className="text-xs font-bold whitespace-nowrap">
        {todoData.category}
      </h4>
      <div className="text-xs border px-1.5 w-fit whitespace-nowrap">
        {todoData.status}
      </div>
      <p className="text-xs px-1.5 border rounded-full">{todoData.priority}</p>
      <p className="text-xs whitespace-nowrap">{due}</p>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onView();
        }}
        className="p-1.5 rounded-full hover:bg-blue-500/10 active:bg-blue-500/10 hover:border active:border hover:border-blue-500/20 active:border-blue-500/20 cursor-pointer"
      >
        <IoIosEye size={18} className="text-blue-600" />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onEdit();
        }}
        className="p-1.5 rounded-full hover:bg-mist-500/10 active:bg-mist-500/10 hover:border active:border hover:border-green-500/20 active:border-green-500/20 cursor-pointer"
      >
        <BiEdit className="text-mist-600" />
      </button>
      <button onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onDelete();
      }} className="p-1.5 rounded-full hover:bg-red-500/10 active:bg-red-500/10 hover:border active:border hover:border-red-500/20 active:border-red-500/20 cursor-pointer">
        <BiTrash className="text-red-500" />
      </button>
    </div>
  );
};

export default TodoBar;
