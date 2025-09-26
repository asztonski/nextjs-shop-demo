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
    <div className="flex rounded-[20px] flex-col gap-4 lg:gap-0 lg:flex-row w-full lg:w-105 relative lg:h-15 overflow-x-hidden">
      <TextField
        className="lg:!rounded-none h-11 lg:h-auto"
        placeholder={textFieldPlaceholder}
        value={textFieldValue}
      />
      <Button
        className="static lg:absolute text-foreground right-0 top-0 lg:h-full justify-center lg:justify-start py-3 lead"
        icon={buttonIcon}
      >
        {buttonText}
      </Button>
    </div>
  );
};
