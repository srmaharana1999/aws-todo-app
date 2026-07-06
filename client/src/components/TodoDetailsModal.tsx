import type { TodoType } from "../lib/todo-api";
import { IoEyeOff } from "react-icons/io5";

interface TodoDetailsProps {
  mode: "view" | "edit";
  open: boolean;
  todoDetails: TodoType | null;
  onClose: () => void;
}

const TodoDetailsModal = ({ open, onClose, todoDetails }: TodoDetailsProps) => {
  if (!open || !todoDetails) return null;
  const createdDate = todoDetails.createdAt.split("T")[0];
  const dueDate = todoDetails.dueDate.split("T")[0];
  return (
    <div className="absolute inset-0 z-50 backdrop-blur-md flex justify-center items-center">
      <div className="max-w-lg w-full bg-white rounded-xl border-2 border-blue-500">
        <div className="flex text-blue-500  justify-between py-2 px-6 border-b-2 border-blue-500">
          <p className="uppercase font-medium">Todo Details</p>

          <button
            onClick={onClose}
            className="text-xs px-1 border flex items-center gap-1 hover:bg-red-500 active:bg-red-500 hover:text-white active:text-white hover:shadow-sm active:shadow-sm hover:border-none active:border-none cursor-pointer rounded-full"
          >
            <IoEyeOff /> Close
          </button>

        </div>
        <div className="text-sm text-blue-900 space-y-4 p-4">
          <div className="border rounded border-blue-500">
            <strong className="text-xs block text-white bg-blue-500 py-1 px-2 border-b w-full">
              Title
            </strong>
            <p className="p-1.5 italic">{todoDetails.title}</p>
          </div>
          <div className="border rounded border-blue-500">
            <strong className="text-xs block text-white bg-blue-500 py-1 px-2 w-full">
              Description
            </strong>
            <p className="p-1.5 min-h-24 italic">{todoDetails.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <FieldView label="Category" value={todoDetails.category} />
            <FieldView label="Status" value={todoDetails.status} />
            <FieldView label="Priority" value={todoDetails.priority} />
            <FieldView label="Due Date" value={dueDate} />
            <FieldView label="Created At" value={createdDate} />
            <FieldView label="Updated At" value="" />
          </div>
        </div>
      </div>
    </div>
  );
};

function FieldView({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[100px_auto] items-center rounded gap-3 border border-blue-500">
      <strong className="text-xs p-2 text-white bg-blue-500 capitalize">
        {label}
      </strong>
      <span className="">{value ? value : "NA"}</span>
    </div>
  );
}
export default TodoDetailsModal;
