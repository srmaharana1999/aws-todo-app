"use client";
import {
  useController,
  type UseControllerProps,
  type FieldValues,
} from "react-hook-form";

interface TextFieldOwnProps {
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  step?: string;
  className?: string;
  description?: string;
}

type TextFieldProps<T extends FieldValues> = UseControllerProps<T> &
  TextFieldOwnProps;

const TextField = <T extends FieldValues>(props: TextFieldProps<T>) => {
  const {
    label,
    placeholder,
    type = "text",
    step,
    className,
    description,
  } = props;
  const { field, fieldState } = useController(props);

  // datetime-local inputs require "YYYY-MM-DDTHH:mm" string format.
  // When react-hook-form holds a Date object (e.g. from defaultValues),
  // we must convert it explicitly — otherwise the input shows blank/today.
  const getInputValue = () => {
    if (type === "datetime-local" && (field.value as unknown) instanceof Date) {
      const d = field.value;
      const pad = (n: number) => String(n).padStart(2, "0");
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    }
    return field.value;
  };

  return (
    <div className={`w-full text-xs flex flex-col gap-1 ${className ?? ""}`}>
      {label && <label className="font-medium">{label}</label>}
      {description && <p className="text-gray-500">{description}</p>}

      <input
        {...field}
        value={getInputValue()}
        type={type}
        step={step}
        placeholder={placeholder ?? label}
        className={`px-3 py-1 border rounded-md text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 placeholder:text-neutral-400 placeholder:text-xs transition-all ${fieldState.error
          ? "border-red-400 focus:ring-red-300"
          : fieldState.isTouched
            ? "border-neutral-400"
            : "border-neutral-200"
          }`}
      />

      {fieldState.error && (
        <p className="text-red-500 mt-0.5">
          {fieldState.error.message}
        </p>
      )}
    </div>
  );
};

export default TextField;
