"use client";

import {
  useController,
  type UseControllerProps,
  type FieldValues,
} from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

interface SelectFieldOwnProps {
  label?: string;
  className?: string;
  options?: Option[];
  placeholder: string;
}

type SelectFieldProps<T extends FieldValues> = UseControllerProps<T> &
  SelectFieldOwnProps;

const SelectOptions = <T extends FieldValues>(props: SelectFieldProps<T>) => {
  const { label, className, options, placeholder } = props;

  const { field, fieldState } = useController(props);

  return (
    <div className={`w-full flex text-xs flex-col gap-1 ${className ?? ""}`}>
      {label && <label className="font-medium capitalize">{label}</label>}

      <select
        {...field}
        value={field.value ?? ""}
        onChange={(e) => field.onChange(e.target.value)}
        className={`px-3 py-1 w-full border text-xs rounded-md text-neutral-600 focus:outline-none text-sm focus:ring-2 transition-all ${fieldState.error
          ? "border-red-400 focus:ring-red-300"
          : fieldState.isTouched
            ? "border-neutral-400"
            : "border-neutral-200"
          }`}
      >
        <option value="" className="text-xs" disabled>
          {placeholder}
        </option>

        {options?.map((option) => (
          <option key={`${props.name}-${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {fieldState.error && (
        <p className="text-red-500 mt-0.5">
          {fieldState.error.message}
        </p>
      )}
    </div>
  );
};

export default SelectOptions;
