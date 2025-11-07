"use client";

import { Button } from "../button/Button";
import { TextField } from "./TextField";

type InputGroupProps = {
  buttonText: string;
  buttonIcon?: string;
  textFieldValue: string;
  textFieldPlaceholder: string;
};

export const InputGroup = ({
  buttonText,
  buttonIcon,
  textFieldValue,
  textFieldPlaceholder,
}: InputGroupProps) => {
  return (
    <div className="flex flex-col  gap-4 lg:gap-0 lg:flex-row w-full sm:w-3/4 lg:w-105 relative lg:h-15 overflow-hidden">
      <TextField
        className="w-full h-full !border-none !rounded-[20px]"
        placeholder={textFieldPlaceholder}
        value={textFieldValue}
        onChange={(e) => {
          console.log(e.target.value);
        }}
      />
      <Button
        className="static lg:absolute text-foreground !w-44 right-0 top-0 lg:h-full"
        icon={buttonIcon}
      >
        {buttonText}
      </Button>
    </div>
  );
};
