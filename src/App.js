import React from "react";
import { Switch, Route } from "react-router-dom";
import Cookies from "universal-cookie";
import LoginComponent from "./MyComponents/AuthComponents/LoginComponent";
import Logoutpage from "./MyComponents/AuthComponents/Logout";
import RegistrationComponent from "./MyComponents/AuthComponents/RegistrationComponent";
import Dashboard from "./MyComponents/DashboardComponent/Dashboard";
import ScanQRCodePage from "./MyComponents/DashboardComponent/ScanQRCodeComponent";
import Addvisitor from "./MyComponents/DashboardComponent/VisitorComp/AddVisitor";
import VisitorDetailsPage from "./MyComponents/DashboardComponent/VisitorDetailsComponent";
import VisitorsPage from "./MyComponents/DashboardComponent/VisitorsCpomponent";
import Checkoutvisitor from "./MyComponents/DashboardComponent/VisitorComp/Checkoutvisitor";
import Editvisitor from "./MyComponents/DashboardComponent/VisitorComp/Editcisitor";
import Profile from "./MyComponents/DashboardComponent/Profile";
import SetNewPasswordForm from "./MyComponents/AuthComponents/SetNewPassword";
import ForgotPasswordForm from "./MyComponents/AuthComponents/ForgatPassword";
import ChangePasswordComp from "./MyComponents/DashboardComponent/ChangePassword";
const cookies = new Cookies();

function App() {
  const jwttoken = cookies.get("jwttoken");
  //console.log(jwttoken);
  return (
    <div className="App">
      <Switch>
        <Route exact path="/loginpage" component={LoginComponent} />
        <Route exact path="/" component={LoginComponent} />
        <Route
          exact
          path="/setnewpassword/:id"
          component={SetNewPasswordForm}
        />
        <Route exact path="/forgotpassword" component={ForgotPasswordForm} />
        <Route
          exact
          path="/registrationpage"
          component={RegistrationComponent}
        />

        <Route exact path="/logout" component={Logoutpage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/dashboard/home" component={Dashboard} />
        <Route exact path="/dashboard/visitors" component={VisitorsPage} />
        <Route
          exact
          path="/dashboard/visitors/addvisitor"
          component={Addvisitor}
        />
        <Route
          exact
          path="/dashboard/visitor/editvisitor/:id"
          component={Editvisitor}
        />
        <Route
          exact
          path="/dashboard/visitor/checkout/:id"
          component={Checkoutvisitor}
        />
        <Route
          exact
          path="/dashboard/scanqrcode/:id"
          component={ScanQRCodePage}
        />
        <Route
          exact
          path="/dashboard/visitors/visitordetails/:id"
          component={VisitorDetailsPage}
        />
        <Route exact path="/Profile" component={Profile} />
        <Route
          exact
          path="/profile/setnewpassword"
          component={ChangePasswordComp}
        />
      </Switch>
    </div>
  );
}

export default App;
