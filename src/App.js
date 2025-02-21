import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.js";
import Resources from "./components/Resources/Resources.js" ;
import Utilization from "./components/Utilization/Utilization.js" ;
import Cost from "./components/Cost/Cost.js" ;
import Opportunities from "./components/Opportunities/Opportunities.js"; 
import GreenSwitch from "./components/GreenSwitch/GreenSwitch.js";

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Resources />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/utilization" element={<Utilization />} />
        <Route path="/cost" element={<Cost />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/greenswitch" element={<GreenSwitch />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
