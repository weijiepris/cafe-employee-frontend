import React from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/Main.css";

const Main = () => {
  const navigate = useNavigate();

  const redirectToCafe = () => {
    navigate("/cafe");
  };
  const redirectToEmployee = () => {
    navigate("/employee");
  };
  //   if (!isLoaded) {
  //     return (
  //       <>
  //         <div>NOT LOADED</div>
  //         <button onClick={() => dispatch(cafeActions.add({ isLoaded: true }))}>
  //           Load Cafe
  //         </button>
  //       </>
  //     );
  //   }

  return (
    <>
      <div className="">Main</div>
      <button onClick={() => redirectToCafe()}>Go to Cafe</button>
      <button onClick={() => redirectToEmployee()}>Go to Employee</button>
    </>
  );
};

export default Main;
