import { useState } from "react";

interface Props {
  onSubmit: (bid: string) => void;
  onPass: () => void;
  minBid: number;
}

export const BiddingBox = ({
  minBid,
  onPass,
  onSubmit,
}: Props): JSX.Element => {
  const [bid, setBid] = useState<number>(minBid);

  return (
    <div className={"w-full "}>
      <div>
        <button onClick={() => setBid(bid - 5)} disabled={bid <= minBid}>
          -
        </button>
        <div>{bid}</div>
        <button onClick={() => setBid(bid + 5)} disabled={bid >= 200}>
          +
        </button>
      </div>
      <div>
        <button onClick={onPass}>pass</button>
        <button onClick={() => onSubmit(`${bid}`)}>bid</button>
      </div>
    </div>
  );
};
