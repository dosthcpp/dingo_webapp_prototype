import React, { useEffect } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import SideMenu from "../components/SideMenu";
import ContentHeader from "../components/ContentHeader";
import ChannelService from "../service/channelio";
import { firestore } from "../firebase";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { fetchAgreementList, addNotifications } from "../actions";

import "../css/style.css";
import { connect, useDispatch } from "react-redux";
import { router } from "../router";

const Main = ({ navNo, fetchAgreementList, addNotifications }) => {
  useEffect(() => {
    ChannelService.boot({
      pluginKey: "4eb363cd-2f5e-4503-aa5b-2cf08d881068", //please fill with your plugin key
      memberId: "유저ID",
      profile: {
        name: "유저Name",
        email: "유저Email",
        id: "유저ID",
      },
    });
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = firestore
      .collection("user")
      .where("userType", "==", "학부모")
      .onSnapshot((snap) => {
        snap.docChanges().forEach(async (change) => {
          if (change.doc.data() !== null) {
            const agreementList = Array.from(
              change?.doc?.data()["동의서"] ?? []
            );
            for (var i = 0; i < agreementList.length; ++i) {
              const agreement = agreementList[i];
              if (
                agreement["isAgreed"] !== null &&
                agreement["hasNotified"] !== null &&
                agreement["hasNotified"] === false &&
                agreement["isAgreed"] === true
              ) {
                const noti = `${
                  change.doc.data()["부모님 성함"]
                } 학부모님께서 ${change.doc.data()["원아 이름"]} 원아의 ${
                  agreementList[i]["title"]
                }에 동의하셨습니다.`;
                agreementList[i]["hasNotified"] = true;
                await firestore
                  .collection("user")
                  .doc(change.doc.id)
                  // current user
                  .update({ 동의서: agreementList });
                const _pr = addNotifications(noti);
                _pr.then();
                dispatch(fetchAgreementList);
                // raise notification event
                NotificationManager.info(noti);
              }
            }
          }
        });
      });
    return unsubscribe;
  }, [addNotifications, dispatch, fetchAgreementList]);

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <NotificationContainer />
      <div>
        <Header />
      </div>
      <div>
        <Menu />
        <SideMenu />
      </div>
      <div
        style={{
          position: "absolute",
          right: "30px",
          top: "80px",
        }}
      >
        <ContentHeader />
      </div>
      <div className="router">{router(navNo)}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    navNo: state.nav.navNo,
    notifications: state.fetch.notifications,
  };
};

export default connect(mapStateToProps, {
  fetchAgreementList,
  addNotifications,
})(Main);
