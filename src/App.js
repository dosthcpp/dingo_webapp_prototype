import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Chat from "./pages/Chat";
import AddAgreement from "./pages/AddAgreement";
import AddBoard from "./pages/AddBoard";
import ViewBoard from "./pages/ViewBoard";
import LoginForm from "./pages/LoginForm";
import GovPost from "./pages/GovPost";
import ViewGovPost from "./pages/ViewGovPost";
import CoronaPost from "./pages/CoronaPost";
import ViewCoronaPost from "./pages/ViewCoronaPost";

import "./css/style.css";
import "react-resizable/css/styles.css";
import "react-calendar/dist/Calendar.css";
import "react-notifications/lib/notifications.css";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Main />} />
      <Route exact path="/add" element={<AddAgreement />} />
      <Route exact path="/chat" element={<Chat />} />
      <Route exact path="/addBoard" element={<AddBoard />} />
      <Route exact path="/viewBoard" element={<ViewBoard />} />
      <Route exact path="/login" element={<LoginForm />} />
      <Route exact path="/govpost" element={<GovPost />} />
      <Route exact path="/viewgovpost" element={<ViewGovPost />} />
      <Route exact path="/coronapost" element={<CoronaPost />} />
      <Route exact path="/viewcoronapost" element={<ViewCoronaPost />} />
    </Routes>
  );
};

export default App;
