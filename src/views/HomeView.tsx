import React from "react";
import { useGlobalState } from "../providers/GlobalStateProvider";
import { useNavigate } from "react-router-dom";
import { Button } from "../elements/Button";
import { TableSimpleCard } from "../elements/TableSimpleCard";
import { PlayerSimpleCard } from "../elements/PlayerSimpleCard";

export const HomeView = () => {
  const { me, generalMessage, sendWsMsg, playersList, tablesList, logOut } =
    useGlobalState();
  const navigate = useNavigate();

  return (
    <div>
      <div className="w-full flex justify-between items-center mb-3">
        <div>INFO: {generalMessage}</div>
        <div className="flex items-center">
          <div>{me.name}</div>
          <Button onClick={logOut}>Log out</Button>
        </div>
      </div>
      <div className="flex justify-around">
        <div className="border-black border-2 w-3/12">
          <div className="font-bold font-lg flex justify-center">
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
        <div className="border-black border-2 w-7/12">
          <Button onClick={() => sendWsMsg("open_table")}>
            Open new table
          </Button>
          <div className="font-bold font-lg flex justify-center">
            TABLES LIST
          </div>
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
