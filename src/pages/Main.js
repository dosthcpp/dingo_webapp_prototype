import React from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import SideMenu from "../components/SideMenu";
import ContentHeader from "../components/ContentHeader";

import "../css/style.css";
import { connect } from "react-redux";
import { router } from "../router";

const Main = ({ navNo }) => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Menu />
        <SideMenu />
      </div>
      <div>
        <ContentHeader />
        {router(navNo)}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    navNo: state.nav.navNo,
  };
};

export default connect(mapStateToProps, {})(Main);
