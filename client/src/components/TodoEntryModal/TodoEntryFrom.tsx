import { useForm, type Resolver } from "react-hook-form";
import TextField from "../../Fields/TextField";
import { TodoFieldValues, todoSchema, type TodoFormTypes } from "./todo.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import TextArea from "../../Fields/TextArea";
import SelectOptions from "../../Fields/SelectOptions";
import { PRIORITY_OPTIONS, STATUS_OPTIONS, TODO_CATEGORIES } from "./constant";
import { PiPlusBold } from "react-icons/pi";
import { useState } from "react";
import { todoApi } from "../../lib/todo-api";
import toast from "react-hot-toast";
import { TbLoader3 } from "react-icons/tb";
import { IoCloseCircle } from "react-icons/io5";

interface TodoEntryFromProps {
  onClose: () => void
}


const TodoEntryForm = ({ onClose }: TodoEntryFromProps) => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control, reset } = useForm<TodoFormTypes>({
    defaultValues: TodoFieldValues,
    resolver: yupResolver(todoSchema) as Resolver<TodoFormTypes>,
  });

  const onSubmit = async (data: TodoFormTypes) => {
    setLoading(true);
    try {
      await todoApi.addTodo(data);
      toast.success("Task Successfully Added")
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      } else {
        console.error("Error occurred in Adding todo", error);
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
      reset();
    }
  }



  return (
    <div className="w-full max-w-md bg-white border-2 border-violet-800 rounded-lg shadow-xl">
      <div className="flex justify-between px-4 py-2 border-b-2 border-violet-800">
        <h2 className="text-sm text-violet-800 font-medium uppercase">Add Todo</h2>
        <button type="button" className="text-violet-800 hover:text-red-500 active:text-red-500 cursor-pointer" onClick={onClose}><IoCloseCircle /></button>
      </div>
      <form className="space-y-2.5 p-4 text-violet-800" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Title"
          name="title"
          control={control}
          placeholder="Complete Java Basics"
        />
        <TextArea
          label="Description"
          name="description"
          control={control}
          rows={3}
          placeholder="Give a description to help you understand about your task"
        />
        <SelectOptions
          label="Category"
          options={TODO_CATEGORIES}
          name="category"
          control={control}
          placeholder="Choose a Category"
        />
        <SelectOptions
          label="Status"
          options={STATUS_OPTIONS}
          name="status"
          control={control}
          placeholder="Choose a Status"
        />
        <SelectOptions
          label="Priority"
          options={PRIORITY_OPTIONS}
          name="priority"
          control={control}
          placeholder="Choose a Priority"
        />
        <TextField
          label="Due date"
          name="dueDate"
          type="datetime-local"
          control={control}
          placeholder="due date must be today or later"
        />
        <button type="submit" className="p-1.5 text-sm font-medium mt-6 flex w-full items-center justify-center gap-2 mt-5 bg-linear-to-br from-violet-800 to-blue-800 text-white rounded-md shadow-2xl">
          {
            loading ?
              (
                <>
                  <TbLoader3 className="animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <PiPlusBold />
                  <span>Add Todo</span>
                </>
              )
          }
        </button>
      </form>
    </div>
  );
};

export default TodoEntryForm;
