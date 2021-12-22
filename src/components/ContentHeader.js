import React from "react";
import NotificationBadge, { Effect } from "react-notification-badge";
import { connect } from "react-redux";
import { refreshNoti } from "../actions";
import { RowRight, SizedBox } from "../layout";

const ContentHeader = ({ notifications, refreshNoti }) => {
  return (
    <div className="content-header">
      <RowRight>
        <div className="content-header__item">레이아웃</div>
        <div className="menuitem__3-wrapper">
          <div className="content-header__item menuitem menuitem__3">
            <NotificationBadge
              count={notifications.length}
              effect={Effect.SCALE}
            />
            알림
          </div>
          <div className="menuitem__3-popover">
            {Array.from(notifications)
              .sort((a, b) => Date(a["time"]).localeCompare(Date(b["time"])))
              .map((notification) => {
                return (
                  <div
                    style={{
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    onClick={() => {
                      const newNoti = Array.from(notifications).filter(
                        (item) => {
                          return item["time"] !== notification["time"];
                        }
                      );
                      refreshNoti(newNoti);
                    }}
                  >
                    <div>{notification["content"]}</div>
                    <div
                      style={{
                        alignSelf: "flex-end",
                      }}
                    >
                      {`${new Date(notification["time"]).toLocaleDateString(
                        "ko-KR"
                      )} ${new Date(notification["time"]).toLocaleTimeString(
                        "ko-KR"
                      )}`}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="content-header__item">마이페이지</div>
        <SizedBox width="40px" />
      </RowRight>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { notifications: state.fetch.notifications };
};

export default connect(mapStateToProps, {
  refreshNoti,
})(ContentHeader);
