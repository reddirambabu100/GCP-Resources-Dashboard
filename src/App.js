import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotificationProvider } from "./context/NotificationContext";
import Login from "./components/Login/Login";
import Main from "./components/Main/Main";
import Dashboard from "./components/Dashboard/Dashboard";
import Resources from "./components/Resources/Resources";
import Utilization from "./components/Utilization/Utilization";
import Cost from "./components/Cost/Cost";
import Opportunities from "./components/Opportunities/Opportunities";
import GreenSwitch from "./components/GreenSwitch/GreenSwitch";
import NotificationHistory from "./components/NotificationHistory/NotificationHistory";

function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main />}>
          <Route index element={<Dashboard />} />
          <Route path="resources" element={<Resources />} />
          <Route path="utilization" element={<Utilization />} />
          <Route path="cost" element={<Cost />} />
          <Route path="opportunities" element={<Opportunities />} />
          <Route path="greenswitch" element={<GreenSwitch />} />
          <Route path="notificationHistory" element={<NotificationHistory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
