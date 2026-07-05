import type { TodoType } from "../lib/todo-api";

interface TodoDetailsProps {
  mode: "view" | "edit";
  open: boolean;
  todoDetails: TodoType | null;
  onClose: (v: null) => void;
}

const TodoDetailsModal = ({ open, onClose, todoDetails }: TodoDetailsProps) => {
  if (!open || !todoDetails) return null;
  const createdDate = todoDetails.createdAt.split("T")[0];
  const dueDate = todoDetails.dueDate.split("T")[0];
  return (
    <div className="absolute inset-0 z-50 backdrop-blur-md flex justify-center items-center">
      <div className="max-w-lg w-full bg-white rounded-2xl border-2 border-mist-500">
        <div className="flex text-slate-500 justify-between py-2 px-6 border-b-2">
          <p>Todo Details</p>
          <div className="flex items-center gap-2">
            <button className="text-xs px-1 border cursor-pointer rounded-full">
              Edit
            </button>
            <button
              onClick={() => onClose(null)}
              className="text-xs px-1 border cursor-pointer rounded-full"
            >
              Close
            </button>
          </div>
        </div>
        <div className="text-sm text-mist-600 space-y-4 p-4">
          <div className="border rounded">
            <strong className="text-xs block text-white bg-mist-500 py-1 px-2 border-b w-full">
              Title
            </strong>
            <p className="p-1.5 italic">{todoDetails.title}</p>
          </div>
          <div className="border rounded">
            <strong className="text-xs block text-white bg-mist-500 py-1 px-2 border-b w-full">
              Description
            </strong>
            <p className="p-1.5 min-h-32 italic">{todoDetails.description}</p>
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
    <div className="grid grid-cols-[100px_auto] items-center rounded gap-3 border">
      <strong className="text-xs p-2 text-white bg-mist-500 capitalize">
        {label}
      </strong>
      <span className="">{value ? value : "NA"}</span>
    </div>
  );
}
export default TodoDetailsModal;
