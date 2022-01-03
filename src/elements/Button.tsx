import { FC } from "react";

interface Props {
  onClick: () => void;
  color?: string;
  disabled?: boolean;
}

export const Button: FC<Props> = ({
  onClick,
  disabled = false,
  color = "slate",
  children,
}) => {
  return (
    <button
      className={`m-1 px-2 py-1 bg-${color}-200 disabled:bg-${color}-100 rounded ${
        !disabled && `hover:bg-${color}-400`
      } text-sm whitespace-nowrap`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
