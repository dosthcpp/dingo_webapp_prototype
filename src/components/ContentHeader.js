import React from "react";
import { useDispatch } from "react-redux";
import NotificationBadge, { Effect } from "react-notification-badge";
import { connect } from "react-redux";
import { refreshNoti } from "../actions";
import { SizedBox } from "../layout";
import { NAV, USE_LAYOUT } from "../actions/types";

const ContentHeader = ({ notifications, refreshNoti }) => {
  const dispatch = useDispatch();
  return (
    <div className="content-header__wpr">
      <div
        className="content-header__item-1"
        onClick={() => {
          dispatch({
            type: USE_LAYOUT,
          });
        }}
      >
        레이아웃
      </div>
      <SizedBox width="30px" />
      <div className="menuitem-wpr">
        <div className="content-header__item-2">
          알림
          <NotificationBadge
            className="content-header__badge"
            count={notifications.length}
            effect={Effect.SCALE}
          />
        </div>
        <div className="menuitem-popover">
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
                    const newNoti = Array.from(notifications).filter((item) => {
                      return item["time"] !== notification["time"];
                    });
                    refreshNoti(newNoti);
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      maxWidth: "288px",
                      whiteSpace: "break-spaces",
                    }}
                  >
                    {notification["content"]}
                  </div>
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
      <SizedBox width="30px" />
      <div
        className="content-header__item-3"
        onClick={() => {
          dispatch({
            type: NAV,
            payload: 12,
          });
        }}
      >
        마이페이지
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { notifications: state.fetch.notifications };
};

export default connect(mapStateToProps, {
  refreshNoti,
})(ContentHeader);
