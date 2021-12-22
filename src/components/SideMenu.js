import React, { useState } from "react";
import 돋보기 from "../icons/돋보기.png";
import 시계 from "../icons/시계.png";
import 설정 from "../icons/설정.png";
import 템플릿 from "../icons/템플릿.png";
import 가져오기 from "../icons/가져오기.png";
import 휴지통 from "../icons/휴지통.png";
import { useDispatch } from "react-redux";
import { Column, RowCentered, SizedBox } from "../layout";
import { NAV } from "../actions/types";

const SideMenu = () => {
  let [click, setClick] = useState(false);
  const dispatch = useDispatch();

  const collapseable = <span className="menu-list-collapseable">&#9656;</span>;
  const nonCollapseable = (
    <span className="menu-list-noncollapseable">&#9662;</span>
  );

  const renderMenu = () => {
    const menuTitle = [
      ["홈"],
      [
        "업무",
        ["출석부", "동의서 관리", "가정통신문 및 알림장 작성", "학부모 상담"],
      ],
      ["일정", []],
      ["자료실", ["동의서", "가정통신문", "학습자료", "기타"]],
    ];

    return (
      <ul className="menu-no-3">
        {menuTitle.map((cur, idx) => {
          return cur[1] && cur[1].length !== 0 ? (
            <div>
              <li
                className={`menu-list-${idx}`}
                onClick={() => {
                  setClick(!click);
                }}
                key={idx}
              >
                {click ? nonCollapseable : collapseable}
                {cur[0]}
              </li>
              <ul
                className="submenu"
                style={{
                  display: click ? "block" : "none",
                }}
              >
                {cur[1].map((curMenu, idx) => {
                  return (
                    <li
                      className={`menu-list submenu-item-${idx + 1}`}
                      onClick={() => {
                        switch (curMenu) {
                          case "출석부":
                            dispatch({
                              type: NAV,
                              payload: 1,
                            });
                            break;
                          case "동의서 관리":
                            dispatch({
                              type: NAV,
                              payload: 2,
                            });
                            break;
                          case "가정통신문 및 알림장 작성":
                            dispatch({
                              type: NAV,
                              payload: 3,
                            });
                            break;
                          case "학부모 상담":
                            dispatch({
                              type: NAV,
                              payload: 4,
                            });
                            break;
                          case "동의서":
                            dispatch({
                              type: NAV,
                              payload: 5,
                            });
                            break;
                          case "가정통신문":
                            dispatch({
                              type: NAV,
                              payload: 6,
                            });
                            break;
                          case "학습자료":
                            dispatch({
                              type: NAV,
                              payload: 7,
                            });
                            break;
                          case "기타":
                            dispatch({
                              type: NAV,
                              payload: 8,
                            });
                            break;
                          default:
                            break;
                        }
                      }}
                    >
                      {curMenu}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <li
              className={`menu-list-${idx}`}
              onClick={
                cur[1]
                  ? null
                  : () => {
                      dispatch({
                        type: NAV,
                        payload: 0,
                      });
                    }
              }
            >
              {cur[1] ? collapseable : null}
              <span
                style={
                  cur[1]
                    ? null
                    : {
                        marginLeft: 8,
                      }
                }
              >
                {cur[0]}
              </span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="side-menu">
      <div className="menu-div-1">
        <RowCentered>
          <div className="id-div">
            <img
              className="id-div__content image"
              src="https://via.placeholder.com/25"
              alt="Hello"
            />
            <Column>
              <div className="id-div__content title">새싹 유치원</div>
              <div className="id-div__content email">abcd1234@gmail.com</div>
            </Column>
          </div>
        </RowCentered>
      </div>
      <ul className="menu-div-2">
        <li className="menu-item">
          <img
            className="quick-func--div__content image-1"
            src={돋보기}
            alt="Hello"
            style={{ width: "1.5rem" }}
          />
          <div className="menu-title">빠른 검색</div>
        </li>
        <li className="menu-item">
          <img
            className="quick-func--div__content image-2"
            src={시계}
            alt="Hello"
            style={{ width: "1.5rem" }}
          />
          <div className="menu-title">모든 업데이트</div>
        </li>
        <li className="menu-item">
          <img
            className="quick-func--div__content image-3"
            src={설정}
            alt="Hello"
            style={{ width: "1.5rem" }}
          />
          <div className="menu-title">설정과 멤버</div>
        </li>
      </ul>
      <div className="menu-div-3">
        <div className="menu-div__title">워크스페이스</div>
        {renderMenu()}
      </div>
      <div className="menu-div-4">
        <li className="menu-item">
          <img
            className="quick-func--div__content image-4"
            src={템플릿}
            alt="Hello"
            style={{ width: "1.5rem" }}
          />
          <div className="menu-title">템플릿</div>
        </li>
        <li className="menu-item">
          <img
            className="quick-func--div__content image-5"
            src={가져오기}
            alt="Hello"
            style={{ width: "1.5rem" }}
          />
          <div className="menu-title">가져오기</div>
        </li>
        <li className="menu-item">
          <img
            className="quick-func--div__content image-6"
            src={휴지통}
            alt="Hello"
            style={{ width: "1.5rem" }}
          />
          <div className="menu-title">휴지통</div>
        </li>
      </div>
    </div>
  );
};

export default SideMenu;
