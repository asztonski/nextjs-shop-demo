"use client";

import { useState, useEffect } from "react";
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
}) => {
  const [errorVisible, setErrorVisible] = useState(false);

  useEffect(() => {
    if (isInvalid) {
      setErrorVisible(isInvalid);
    } else {
      setErrorVisible(false);
    }
  }, [isInvalid]);

  return (
    <div className="relative">
      <div
        className={`rounded-full bg-foreground relative text-background w-full p-2 overflow-hidden border-3 ${
          isInvalid ? "border-red-500" : ""
        } ${className}`}
      >
        <div className="lg:absolute bg-inherit left-0 top-0 h-full w-full flex items-center gap-3 pl-11">
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
      {isInvalid && (
        <p
          className={`absolute text-red-500 text-xs left-3 top-[110%] z-10 transition-opacity duration-200 ease-in-out ${
            errorVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};
