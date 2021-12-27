import { useState } from "react";

interface Props {
  onClickPlay?: () => void;
  name: string;
  disabled?: boolean;
}

export const Card = ({
  onClickPlay = () => {},
  name,
  disabled = false,
}: Props): JSX.Element => {
  return (
    <button className="w-16 h-20 border-2 border-black mx-1" onClick={onClickPlay}>
      {name}
    </button>
  );
};
