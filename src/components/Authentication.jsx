import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

function Authentication() {
  const [activeTab, setActiveTab] = useState("login");
  //   const navigate = useNavigate();

  //   const { setUser } = ChatState();

  //   useEffect(() => {
  //     const user = JSON.parse(localStorage.getItem("userinfo"));
  //     setUser(user);

  //     if (user) {
  //       navigate("/chat");
  //     }
  //   }, [navigate, setUser]);

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <Card
        className="p-4 shadow-lg"
        style={{ minWidth: "400px", width: "40%" }}
      >
        <Card.Body>
          <h2 className="text-center mb-4 text-primary fw-bold">Chat App</h2>
          <ButtonGroup className="w-100 mb-4">
            <Button
              variant={activeTab === "login" ? "primary" : "outline-primary"}
              onClick={() => setActiveTab("login")}
            >
              Login
            </Button>
            <Button
              variant={activeTab === "signup" ? "primary" : "outline-primary"}
              onClick={() => setActiveTab("signup")}
            >
              Sign Up
            </Button>
          </ButtonGroup>
          {activeTab === "login" ? <Login /> : <Signup />}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Authentication;
