import React, {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { w3cwebsocket } from "websocket";
import { Me, PlayerSimple, TableFull, TableSimple } from "../types";

interface GlobalState {
  me: Me;
  setMe: Dispatch<SetStateAction<Me>>;
  generalMessage: string;
  tablesList: TableSimple[];
  playersList: PlayerSimple[];
  sendWsMsg: (msg: string) => void;
  tableInfo: TableFull | null;
  logOut: () => void;
}

const defaultMe: Me = {
  name: "",
  tableId: "",
  playerIndex: null,
};

const defaultSendWsMsgFunction = (msg: string) => {};

const GlobalStateContext = createContext<GlobalState>({
  me: defaultMe,
  setMe: () => {},
  generalMessage: "",
  tablesList: [],
  playersList: [],
  sendWsMsg: defaultSendWsMsgFunction,
  tableInfo: null,
  logOut: () => {},
});

export const useGlobalState = () => {
  const context = React.useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within GlobalStateProvider");
  }
  return context;
};

export const GlobalStateProvider: FC = ({ children }) => {
  const [me, setMe] = useState(defaultMe);
  const [generalMessage, setGeneralMessage] = useState("");
  const [tablesList, setTablesList] = useState<TableSimple[]>([]);
  const [playersList, setPlayersList] = useState<PlayerSimple[]>([]);
  const [tableInfo, setTableInfo] = useState<TableFull | null>(null);
  const wsSendMsgRef = useRef(defaultSendWsMsgFunction);
  const wsCloseRef = useRef(() => {});

  useEffect(() => {
    if (me.name) {
      console.log("here", me.name);

      // setup ws client
      const wsClient = new w3cwebsocket(`ws://localhost:9000/${me.name}/ws`);

      // msg listener
      wsClient.onmessage = (msg) => {
        const message = JSON.parse(msg.data as string);
        const type = message.type;
        // set state based on msg type
        if (type === "generalInfo") {
          setGeneralMessage(message?.info || "");
        }
        if (type === "meInfo") {
          setMe({ ...me, tableId: message.tableId });
        }
        if (type === "tableInfo") {
          setMe({
            ...me,
            tableId: message.tableId,
            playerIndex: message.players.find(
              (p: { name: string }) => p.name == me.name
            ).playerIndex,
          });
          console.log(message);
          setTableInfo(message);
        }
        if (type === "tablesList") {
          setTablesList(message.list);
        }
        if (type === "playersList") {
          setPlayersList(message.list);
        }
      };

      // setup send msg function
      wsSendMsgRef.current = (msg: string) => {
        wsClient.send(msg);
      };

      wsCloseRef.current = () => {
        wsClient.close();
      };

      return () => {
        wsClient.close();
      };
    }
  }, [me.name]);

  const logOut = () => {
    localStorage.clear();
    wsCloseRef.current();
    setMe({ ...me, name: "" });
  };

  return (
    <GlobalStateContext.Provider
      value={{
        me,
        setMe,
        generalMessage,
        tablesList,
        playersList,
        sendWsMsg: wsSendMsgRef.current,
        tableInfo,
        logOut,
      }}
    >
      <div className="mx-auto min-h-[100vh] max-w-[1200px] w-full bg-gray-100">
        {children}
      </div>
    </GlobalStateContext.Provider>
  );
};
