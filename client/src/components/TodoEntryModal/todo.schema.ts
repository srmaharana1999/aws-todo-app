import * as Yup from "yup";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const todoSchema = Yup.object({
  title: Yup.string().required("Required.").trim(),
  description: Yup.string().required("Required"),
  status: Yup.string()
    .oneOf(["TODO", "IN_PROGRESS", "DONE"])
    .required("Required"),
  priority: Yup.string()
    .oneOf(["LOW", "MEDIUM", "HIGH"])
    .required("Required"),
  dueDate: Yup.date()
    .required("Required")
    .min(today, "Due date must be today or later."),
  category: Yup.string().required("Required"),
});

export type TodoFormTypes = Yup.InferType<typeof todoSchema>;

export const TodoFieldValues: TodoFormTypes = {
  title: "",
  description: "",
  status: "TODO" as const,
  priority: "LOW" as const,
  dueDate: new Date(),
  category: "",
};
