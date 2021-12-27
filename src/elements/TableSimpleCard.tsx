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
    <div className="flex justify-between items-center border-2 border-red-300 border-dashed p-2 w-full">
      <div className="px-3">
        <div className="font-semibold">TABLE ID: {table.id}</div>
        <div className="flex">
          {table.players.map((p) => (
            <div className="p-1 mx-1 border-1 bg-slate-100" key={p}>{p}</div>
          ))}
        </div>
      </div>
      <div className="flex">
        {myTableId !== table.id && <Button onClick={onJoinTable}>JOIN</Button>}
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
