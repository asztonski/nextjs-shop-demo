import Image from "next/image";

export const TextField = ({
  placeholder,
  value,
  icon,
  className,
  inputClassName,
  onChange,
  type,
}: {
  placeholder: string;
  value: string;
  icon?: string;
  className?: string;
  inputClassName?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) => {
  return (
    <div
      className={`rounded-full bg-foreground relative text-background w-full p-2 overflow-hidden ${className}`}
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
        />
      </div>
    </div>
  );
};
