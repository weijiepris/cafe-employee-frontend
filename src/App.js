import "./App.css";
import { Routes, Route } from "react-router-dom";

import Cafe from "./components/cafe/Cafes";
import Employee from "./components/employee/Employee";
import Main from "./components/main/Main";

// import { Provider } from "react-redux";

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
