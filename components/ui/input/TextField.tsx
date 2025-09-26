"use client";
import { useState } from "react";

import Image from "next/image";

export const TextField = ({
  placeholder,
  value,
  icon,
  className,
}: {
  placeholder: string;
  value: string;
  icon?: string;
  className?: string;
}) => {
  const [inputValue, setInputValue] = useState(value);

  return (
    <div
      className={`rounded-full bg-foreground relative text-background w-full p-2 ${className}`}
    >
      <div className="absolute left-0 top-0 h-full w-full flex items-center gap-3 pl-5">
        {icon && (
          <Image
            src={icon}
            width={20}
            height={20}
            alt={`${icon} icon`}
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
          />
        )}
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="p-2"
        />
      </div>
    </div>
  );
};
