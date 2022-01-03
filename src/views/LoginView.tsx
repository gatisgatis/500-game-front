import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../providers/GlobalStateProvider";
import { ENDPOINT } from "../constants";
import { Button } from "../elements/Button";

export const LoginView = () => {
  const { setMe } = useGlobalState();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(
    localStorage.getItem("playerName") || ""
  );
  const [warning, setWarning] = useState("");

  const onLogin = async (name: string) => {
    const response = await fetch(`${ENDPOINT}/login`, {
      method: "POST",
      body: name,
    });
    const data = await response.json();
    if (data) {
      setMe({
        name,
        tableId: "",
        playerIndex: null,
      });
      localStorage.setItem("playerName", name);
      navigate("/"); // change this to navigate to tableview if original link was for table...
    } else {
      setInputValue("");
      setWarning("This name is already taken");
    }
  };

  return (
    <div className="flex flex-col items-center pt-16">
      <h1 className="text-8xl">500</h1>
      <h3 className="text-4xl mb-16">CARD GAME</h3>
      <div className="mb-4">ENTER YOU NAME</div>
      <div>
        <input
          className="bg-blue ml-4"
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setWarning("");
          }}
        />
        <Button onClick={() => onLogin(inputValue)}>OK</Button>
      </div>
      {warning && warning}
    </div>
  );
};
