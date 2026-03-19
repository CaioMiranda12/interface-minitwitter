"use client";
import { Controller, type Control, type FieldErrors, type FieldValues, type Path } from "react-hook-form";
import type { IconType } from "react-icons";

export interface InputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errors?: FieldErrors<T>;
  label: string;
  typeInput: string;
  placeholderText: string;
  icon?: IconType;
}

export default function Input<T extends FieldValues>({
  name,
  control,
  errors,
  label,
  placeholderText,
  typeInput,
  icon: Icon
}: InputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className='flex flex-col'>
          <label htmlFor={name} className='text-twitterGray font-normal text-sm mb-2 dark:dark:text-[#90A1B9]'>{label}</label>
          <div className={`flex items-center p-4 bg-white border rounded-lg gap-2 dark:bg-[#1D293D]
            ${errors?.[name] ? "border-red-500" : "border-gray-400"}
            focus-within:border-primary
            `}>
            <input
              id={name}
              {...field}
              type={typeInput}
              placeholder={placeholderText}
              className='w-full outline-none placeholder:text-twitterGray bg-transparent'
            />

            {Icon && <Icon size={24} color="#62748E" />}
          </div>

          {errors?.[name] && (
            <span className='text-red-500 text-sm mt-1'>
              {errors[name]?.message as string}
            </span>
          )}
        </div>
      )}
    />
  );
}