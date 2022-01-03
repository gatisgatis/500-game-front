import { TableSimple } from "../types";
import { Button } from "./Button";

interface Props {
  table: TableSimple;
  myTableId: string;
  onJoinTable: () => void;
  onLeaveTable: () => void;
  onGoToTable: () => void;
}

export const TableSimpleCard = ({
  table,
  myTableId,
  onGoToTable,
  onJoinTable,
  onLeaveTable,
}: Props): JSX.Element => {
  return (
    <div className="flex justify-between items-center p-2 w-full font-semibold rounded bg-[rgba(0,0,0,0.05)]">
      <div className="px-3">
        <div>{table.id}</div>
        <div className="flex flex-wrap">
          {table.players.map((p) => (
            <div className="px-2 m-1 bg-[rgba(0,0,0,0.1)] rounded" key={p}>{p}</div>
          ))}
        </div>
      </div>
      <div className="flex items-center flex-wrap justify-end">
        {myTableId !== table.id && table.players.length < 3 && <Button onClick={onJoinTable}>JOIN</Button>}
        {myTableId === table.id && (
          <Button onClick={onLeaveTable}>LEAVE</Button>
        )}
        {myTableId === table.id && (
          <Button onClick={onGoToTable}>GO TO TABLE</Button>
        )}
      </div>
    </div>
  );
};
