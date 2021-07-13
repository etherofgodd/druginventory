import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Admin from "./screens/Admin";
import DrugDetailsScreen from "./screens/DrugDetailsScreen";
import EditDrugScreen from "./screens/EditDrugScreen";

import Home from "./screens/Home";
import LoginScreen from "./screens/LoginScreen";
import ManageScreen from "./screens/Manage";
import RegisterScreen from "./screens/RegisterScreen";

function App() {
  return (
    <div className="main_container">
      <Router>
        <div className="header">
          <Header />
        </div>
        <ToastContainer />
        <div className="main">
          <Switch>
            <Route path="/" exact={true}>
              <Home />
            </Route>
            <Route path="/signin">
              <LoginScreen />
            </Route>
            <Route path="/register">
              <RegisterScreen />
            </Route>
            <Route path="/admin" exact={true}>
              <Admin />
            </Route>
            <Route path="/manage/:id">
              <EditDrugScreen />
            </Route>
            <Route path="/drug/:id">
              <DrugDetailsScreen />
            </Route>
            <Route path="/admin/manage" exact={true}>
              <ManageScreen />
            </Route>
          </Switch>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
