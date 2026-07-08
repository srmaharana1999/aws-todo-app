import { useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { todoSchema, type TodoFormTypes } from "./TodoEntryModal/todo.schema";
import TextField from "../Fields/TextField";
import TextArea from "../Fields/TextArea";
import SelectOptions from "../Fields/SelectOptions";
import { PRIORITY_OPTIONS, STATUS_OPTIONS, TODO_CATEGORIES } from "./TodoEntryModal/constant";
import { todoApi, type TodoType } from "../lib/todo-api";
import { GrUpdate } from "react-icons/gr";
import { IoCloseCircle } from "react-icons/io5";
import toast from "react-hot-toast";
import { TbLoader3 } from "react-icons/tb";
interface TodoEditForm {
    open: boolean;
    editValues: TodoFormTypes;
    task: TodoType | null;
    onClose: () => void
}


const TodoEditModal = ({ editValues, open, task, onClose }: TodoEditForm) => {
    const [loading, setLoading] = useState(false);

    if (!open || !task) return null;

    const { handleSubmit, control, reset } = useForm<TodoFormTypes>({
        defaultValues: editValues,
        resolver: yupResolver(todoSchema) as Resolver<TodoFormTypes>,
    });

    const onSubmit = async (data: TodoFormTypes) => {
        setLoading(true);
        try {
            await todoApi.updateTodo(task.id, data);
            toast.success("Todo Updated")
            onClose();
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                toast.error(error.message);
            } else {
                console.error("Error occurred in Updating todo", error);
                toast.error("Something went wrong");
            }
        } finally {
            setLoading(false);
            reset();
        }
    }

    return (
        <div className="absolute inset-0 z-50 backdrop-blur-md flex justify-center items-center">
            <div className="w-full max-w-md bg-white text-mist-500 rounded-lg border-2 border-mist-500 shadow-xl">
                <div className="flex justify-between px-4 py-2 border-b-2">
                    <h2 className="text-sm font-medium uppercase">Update Todo</h2>
                    <button type="button" className="hover:text-red-500 active:text-red-500 cursor-pointer" onClick={onClose}><IoCloseCircle /></button>
                </div>
                <form className="space-y-2.5 p-4" onSubmit={handleSubmit(onSubmit)}>
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
                    <button type="submit" className="p-1.5 text-sm font-medium mt-6 flex w-full items-center justify-center gap-2 mt-5 bg-mist-500 text-white rounded-md shadow-2xl">
                        {
                            loading ?
                                (
                                    <>
                                        <TbLoader3 className="animate-spin" />
                                        <span>Updating...</span>
                                    </>
                                ) : (
                                    <>
                                        <GrUpdate />
                                        <span>Update Todo</span>
                                    </>
                                )
                        }
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TodoEditModal;
