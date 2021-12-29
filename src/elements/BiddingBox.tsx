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
    <div className="w-[40vw] min-w-[200px] max-w-[300px] border-2 border-black rounded p-4 bg-slate-200">
      <div className="flex items-center justify-center mb-4">
        <button
          className="px-2 text-xl sm:px-4 sm:text-2xl text-white font-bold rounded bg-indigo-500 hover:bg-indigo-400 disabled:bg-indigo-300"
          onClick={() => setBid(bid - 5)}
          disabled={bid <= minBid}
        >
          -
        </button>
        <div className="border border-black font-bold text-xl sm:text-2xl px-4 py-2 mx-4 bg-white min-w-[60px] sm:min-w-[100px] text-center">
          {bid}
        </div>
        <button
          className="px-2 text-xl sm:px-4 sm:text-2xl text-white font-bold rounded bg-indigo-500 hover:bg-indigo-400 disabled:bg-indigo-300"
          onClick={() => setBid(bid + 5)}
          disabled={bid >= 200}
        >
          +
        </button>
      </div>
      <div className="flex justify-around items-center">
        <button
          className="px-2 py-1 sm:px-4 text-xl text-white font-bold rounded bg-rose-400 hover:bg-rose-300"
          onClick={onPass}
        >
          pass
        </button>
        <button
          className="px-2 py-1 sm:px-4 text-xl text-white font-bold rounded bg-emerald-500 hover:bg-emerald-400"
          onClick={() => onSubmit(`${bid}`)}
        >
          bid
        </button>
      </div>
    </div>
  );
};
