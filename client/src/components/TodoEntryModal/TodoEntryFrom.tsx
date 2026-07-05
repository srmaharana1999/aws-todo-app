import { useForm, type Resolver } from "react-hook-form";
import TextField from "../../Fields/TextField";
import { TodoFieldValues, todoSchema, type TodoFormTypes } from "./todo.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import TextArea from "../../Fields/TextArea";
import SelectOptions from "../../Fields/SelectOptions";
import { PRIORITY_OPTIONS, STATUS_OPTIONS, TODO_CATEGORIES } from "./constant";
import { PiPlusBold } from "react-icons/pi";
import { useState } from "react";

const TodoEntryForm = () => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control, reset } = useForm<TodoFormTypes>({
    defaultValues: TodoFieldValues,
    resolver: yupResolver(todoSchema) as Resolver<TodoFormTypes>,
  });

  const onSubmit = (data: TodoFormTypes) => {
    setLoading(true);
    try {

    } catch (error) {

    } finally {
      setLoading(false)
    }
  }



  return (
    <div className="w-full max-w-md bg-white rounded-lg p-6 shadow-xl">
      <form className="space-y-2.5" onSubmit={handleSubmit(onSubmit)}>
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
        <button type="submit" className="p-1.5 text-sm font-medium mt-6 flex w-full items-center justify-center gap-2 mt-5 bg-blue-600 text-white rounded-md shadow-2xl"><PiPlusBold /> Create Task</button>
      </form>
    </div>
  );
};

export default TodoEntryForm;
