"use client";
import {
  useController,
  type UseControllerProps,
  type FieldValues,
} from "react-hook-form";

interface TextFieldOwnProps {
  label?: string;
  placeholder?: string;
  className?: string;
  rows?: number;
  description?: string;
}

type TextFieldProps<T extends FieldValues> = UseControllerProps<T> &
  TextFieldOwnProps;

const TextArea = <T extends FieldValues>(props: TextFieldProps<T>) => {
  const { label, placeholder, className, rows, description } = props;
  const { field, fieldState } = useController(props);

  return (
    <div className={`w-full flex flex-col gap-1 ${className ?? ""}`}>
      {label && <label className="text-neutral-600 text-sm capitalize">{label}</label>}
      {description && <p className="text-xs text-gray-500">{description}</p>}

      <textarea
        {...field}
        rows={rows}
        placeholder={placeholder ?? label}
        className={`px-3 py-2 border rounded-md text-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-neutral-400 placeholder:text-sm transition-all ${fieldState.error
          ? "border-red-400 focus:ring-red-300"
          : fieldState.isTouched
            ? "border-neutral-400"
            : "border-neutral-200"
          }`}
      />

      {fieldState.error && (
        <p className="text-xs text-red-500 mt-0.5">
          {fieldState.error.message}
        </p>
      )}
    </div>
  );
};

export default TextArea;
