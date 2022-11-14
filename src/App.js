import React from "react";
import { Switch, Route } from "react-router-dom";
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
      <Switch>
        <Route exact path="/" component={LoginComponent} />
        <Route exact path="/loginpage" component={LoginComponent} />
        <Route
          exact
          path="/registrationpage"
          component={RegistrationComponent}
        />
        <Route exact path="/logout" component={Logoutpage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/dashboard/home" component={Dashboard} />
        <Route exact path="/dashboard/visitors" component={VisitorsPage} />
        <Route exact path="/dashboard/scanqrcode" component={ScanQRCodePage} />
        <Route
          exact
          path="/dashboard/visitors/visitordetails/:id"
          component={VisitorDetailsPage}
        />
      </Switch>
    </div>
  );
}

export default App;
