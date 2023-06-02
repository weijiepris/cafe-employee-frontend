import "./App.css";
import { Routes, Route } from "react-router-dom";

import Cafe from "./components/cafe/Cafe";
import Employee from "./components/employee/Employee";
import Main from "./components/main/Main";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/cafe" element={<Cafe />} />
      <Route path="/employee" element={<Employee />} />
    </Routes>
  );
};

export default App;
