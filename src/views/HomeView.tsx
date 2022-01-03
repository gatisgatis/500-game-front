import React from "react";
import { useGlobalState } from "../providers/GlobalStateProvider";
import { useNavigate } from "react-router-dom";
import { TableSimpleCard } from "../elements/TableSimpleCard";
import { PlayerSimpleCard } from "../elements/PlayerSimpleCard";

export const HomeView = () => {
  const { me, generalMessage, sendWsMsg, playersList, tablesList, logOut } =
    useGlobalState();
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <div className="w-full flex justify-between items-center mb-3">
        <div className="self-start mx-4 font-semibold">{
          generalMessage
        }</div>
        <div className="flex items-center">
          <div className="font-bold mr-4 text-lg">{me.name}</div>
          <button onClick={logOut}>LOG OUT</button>
        </div>
      </div>
      <div className="flex flex-col items-start justify-around sm:flex-row">
        <div className="basis-1/3 w-full m-2 bg-gray-200 rounded p-2">
          <div className="font-bold font-lg sm:text-center mb-2">
            PLAYERS LIST
          </div>
          {playersList.map((player) => {
            return (
              <PlayerSimpleCard
                key={player.name}
                player={player}
                myName={me.name}
              />
            );
          })}
        </div>
        <div className="basis-2/3 w-full m-2 bg-orange-100 rounded p-2 relative">
          <div className="font-bold font-lg sm:text-center mb-2">
            TABLES LIST
          </div>
          <button className="absolute top-[4px] right-[4px] p-1 bg-orange-200 rounded font-semibold hover:bg-[rgba(255,255,0,0.2)]" onClick={() => sendWsMsg("open_table")}>
            OPEN TABLE
          </button>
          {tablesList.map((table) => {
            return (
              <TableSimpleCard
                key={table.id}
                table={table}
                myTableId={me.tableId}
                onJoinTable={() => {
                  sendWsMsg(`join_table ${table.id}`);
                }}
                onLeaveTable={() => {
                  sendWsMsg(`leave_table ${table.id}`);
                }}
                onGoToTable={() => {
                  navigate(`/table/${table.id}`);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
