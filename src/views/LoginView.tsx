import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../elements/GlobalStateProvider";
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
      navigate("/");
    } else {
      setInputValue("");
      setWarning("This name is already taken");
    }
  };

  return (
    <div>
      <h1>ENTER YOUR NAME</h1>
      <input
        className="bg-blue"
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setWarning("");
        }}
      />
      <Button onClick={() => onLogin(inputValue)}>Register</Button>
      {warning && warning}
    </div>
  );
};
