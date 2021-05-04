import React from "react";

import SideBar from "../../components/SideBar";

import { useAuth } from "../../hooks/auth";
import { Container } from "./styles";

import stepImg from "../../assets/Step-bro.svg";
import Topnav from "../../components/Topnav";

function Landing() {
  const { user } = useAuth();
  const { name, gender } = user;

  return (
    <>
      <SideBar />
      <Container>
        <Topnav title="" />
        <div
          style={{
            font: "700 3rem Poppins",
            color: "var(--color-primary)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          Welcome to STEP-X {name}!
          <img src={stepImg} alt="step" style={{ width: "70%" }} />
        </div>
      </Container>
    </>
  );
}

export default Landing;
