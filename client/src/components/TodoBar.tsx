import { BiEdit, BiTrash } from "react-icons/bi";
import { IoIosEye } from "react-icons/io";
import type { TodoType } from "../lib/todo-api";

interface TodoBarProps {
  todoData: TodoType;
  handleMode: (v: "view" | "edit") => void;
  onView: (v: TodoType) => void;
  index: number;
}

const TodoBar = ({ handleMode, onView, todoData, index }: TodoBarProps) => {
  const due = todoData.dueDate.split("T")[0];
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleMode("view");
      }}
      className="min-h-16 bg-white grid grid-cols-[80px_1.5fr_0.6fr_0.4fr_80px_0.4fr_60px_60px_60px] place-items-center p-4"
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
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onView(todoData);
        }}
        className="p-1.5 rounded-full hover:bg-blue-500/10 hover:border hover:border-blue-500/20 cursor-pointer"
      >
        <IoIosEye size={18} className="text-blue-600" />
      </div>
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleMode("edit");
        }}
        className="p-1.5 rounded-full hover:bg-green-500/10 hover:border hover:border-green-500/20 cursor-pointer"
      >
        <BiEdit className="text-green-600" />
      </div>
      <div className="p-1.5 rounded-full hover:bg-red-500/10 hover:border hover:border-red-500/20 cursor-pointer">
        <BiTrash className="text-red-500" />
      </div>
    </div>
  );
};

export default TodoBar;
