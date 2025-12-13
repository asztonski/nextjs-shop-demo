"use client";

import Image from "next/image";

export const TextField = ({
  placeholder,
  value,
  icon,
  className,
  inputClassName,
  onChange,
  type,
  isInvalid,
  errorMessage,
  onBlur,
  name,
}: {
  placeholder: string;
  value: string;
  icon?: string;
  className?: string;
  inputClassName?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  isInvalid?: boolean;
  errorMessage?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  inputClassName?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  isInvalid?: boolean;
  errorMessage?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
}) => {
  return (
    <div className={`relative w-full`}>
      <div
        className={`rounded-full bg-foreground relative text-background w-full p-2 overflow-hidden border-3 ${
          isInvalid ? "border-red-500" : ""
        } ${className}`}
      >
        <div
          className={`lg:absolute bg-inherit left-0 top-0 h-full w-full flex items-center gap-3 ${
            icon ? "pl-11" : "pl-4"
          }`}
        >
          {icon && (
            <Image
              src={icon}
              width={20}
              height={20}
              alt={`${icon} icon`}
              className="absolute left-5 top-1/2 transform -translate-y-1/2"
            />
          )}
          <input
            type={type || "text"}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`p-2 bg-inherit ${inputClassName}`}
            onBlur={onBlur}
            name={name}
          />
        </div>
      </div>
      <div
        className={`grid ease-[ease] duration-500 ${
          isInvalid ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <p className={`text-red-500 text-xs mt-2 ml-2 overflow-hidden`}>
          {isInvalid ? errorMessage : "."}
        </p>
      </div>
    </div>
  );
};
