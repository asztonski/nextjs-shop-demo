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
    <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row w-full sm:w-3/4 lg:w-105 lg:h-15 relative overflow-hidden">
      <TextField
        className="w-full h-full !border-none !rounded-[20px] !p-0"
        placeholder={textFieldPlaceholder}
        value={textFieldValue}
        onChange={(e) => {
          console.log(e.target.value);
        }}
      />
      <Button
        className="static lg:absolute text-foreground right-0 top-0 !py-2 !w-full lg:!w-42 lg:!h-full"
        icon={buttonIcon}
      >
        {buttonText}
      </Button>
    </div>
  );
};
