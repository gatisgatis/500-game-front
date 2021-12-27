import { useState } from "react";

interface Props {
  onSubmit: (bid: string) => void;
}

export const BiddingBox = ({ onSubmit }: Props): JSX.Element => {
  const [value, setValue] = useState("");

  return (
    <div className="border-2 border-red p-4">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => onSubmit(value)}>Ok</button>
    </div>
  );
};
