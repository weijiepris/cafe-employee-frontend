import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { cafeActions } from "../../redux/cafeReducer";
import "../../styles/Main.css";

const Main = () => {
  const isLoaded = useSelector((state) => state.cafe.isLoaded);
  const dispatch = useDispatch();
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
