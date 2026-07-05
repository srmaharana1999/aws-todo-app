import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { todoApi, type TodoType } from "../lib/todo-api";
import TodoEntryModal from "../components/TodoEntryModal";
import TodoDetailsModal from "../components/TodoDetailsModal";
import TodoBar from "../components/TodoBar";

const Dashboard = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState(false);
  const [taskDetails, setTaskDetails] = useState<TodoType | null>(null);
  const [todoModalMode, setTodoModalMode] = useState<"view" | "edit">("view");
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const res = await todoApi.getAll();
        setTodos(res);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          toast.error(error.message);
        } else {
          console.error("Error occurred in Fetching todo", error);
          toast.error("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);
  console.log(todos);
  return (
    <div className="relative h-screen min-w-[960px] w-full text-blue-500">
      <div className=" text-white bg-blue-600 mx-auto font-medium grid grid-cols-[80px_1.5fr_0.6fr_0.4fr_80px_0.4fr_60px_60px_65px] p-3 border border-blue-500 text-xs place-items-center">
        <p>Serial No.</p>
        <p>Title</p>
        <p>Category</p>
        <p>Status</p>
        <p>Priority</p>
        <p>Due Date</p>
        <p>View</p>
        <p>Edit</p>
        <p>Delete</p>
      </div>
      <div className="flex flex-col divide-y h-full bg-slate-50">
        {todos.map((todo, index) => (
          <TodoBar
            key={todo.id}
            index={index + 1}
            todoData={todo}
            onView={setTaskDetails}
            handleMode={setTodoModalMode}
          />
        ))}
      </div>
      <TodoEntryModal />
      <TodoDetailsModal
        todoDetails={taskDetails}
        open={!!taskDetails}
        mode={todoModalMode}
        onClose={setTaskDetails}
      />
    </div>
  );
};

export default Dashboard;

// // {
//     "id": "todo_002",
//     "title": "Buy groceries",
//     "description": "Purchase vegetables, fruits, and milk.",
//     "status": "TODO",
//     "priority": "MEDIUM",
//     "createdAt": "2026-07-04T22:09:34.916Z",
//     "updatedAt": "2026-07-04T22:09:34.916Z",
//     "dueDate": "2026-07-05T19:00:00.000Z",
//     "completedAt": "2026-07-06T19:00:00.000Z",
//     "category": "Personal"
// }
