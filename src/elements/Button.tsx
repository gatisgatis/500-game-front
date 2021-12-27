import { FC } from "react";

interface Props {
  onClick: () => void;
}

export const Button: FC<Props> = ({ onClick, children }) => {
  return (
    <button
      className="m-1 p-2 bg-slate-200 rounded-md border-2 border-black"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
