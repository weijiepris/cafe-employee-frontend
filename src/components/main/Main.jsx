import React from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/Main.css";
import Card from "../common/Card";
import Header from "../common/Header";
import { Button } from "@mui/material";

import styles from "./styles/Main.module.css";

const Main = () => {
  const navigate = useNavigate();

  const redirectToCafe = () => {
    navigate("/cafe");
  };
  const redirectToEmployee = () => {
    navigate("/employee");
  };

  return (
    <>
      <Card>
        <Header>Employee Cafe Main Page</Header>
        <Button
          className={styles.returnButton}
          onClick={() => redirectToCafe()}
        >
          Go to Cafe
        </Button>
        <Button
          className={styles.returnButton}
          onClick={() => redirectToEmployee()}
        >
          Go to Employee
        </Button>
      </Card>
    </>
  );
};

export default Main;
