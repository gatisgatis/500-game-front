import { Phase } from "../types";

interface Props {
  name: string;
  onPlay: () => void;
  onPassRight: () => void;
  onPassLeft: () => void;
  phase: Phase;
  isActive: boolean;
}

export const CardLarge = ({
  name,
  onPlay,
  phase,
  onPassLeft,
  onPassRight,
  isActive,
}: Props): JSX.Element => {
  return (
    <div className={`w-16 h-20 border-2 mx-1 hover:bg-red-200`}>
      <div className="text-lg">{name}</div>
      {phase === "Play Cards" && isActive && <button onClick={onPlay}>PLAY</button>}
      {phase === "Pass Cards" && isActive && (
        <div>
          <button onClick={onPassRight}>PASS RIGHT</button>
          <button onClick={onPassLeft}> PASS LEFT</button>
        </div>
      )}
    </div>
  );
};
