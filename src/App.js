import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import LoginComponent from "./MyComponents/AuthComponents/LoginComponent";
import Logoutpage from "./MyComponents/AuthComponents/Logout";
import RegistrationComponent from "./MyComponents/AuthComponents/RegistrationComponent";
import Dashboard from "./MyComponents/DashboardComponent/Dashboard";
import ScanQRCodePage from "./MyComponents/DashboardComponent/ScanQRCodeComponent";
import VisitorDetailsPage from "./MyComponents/DashboardComponent/VisitorDetailsComponent";
import VisitorsPage from "./MyComponents/DashboardComponent/VisitorsCpomponent";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/loginpage" element={<LoginComponent />} />
        <Route path="/registrationpage" element={<RegistrationComponent />} />
        <Route path="/logout" element={<Logoutpage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/home" element={<Dashboard />} />
        <Route path="/dashboard/visitors" element={<VisitorsPage />} />
        <Route path="/dashboard/scanqrcode" element={<ScanQRCodePage />} />
        <Route
          path="/dashboard/visitors/visitordetails"
          element={<VisitorDetailsPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
