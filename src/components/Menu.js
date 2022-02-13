import React, { useState } from "react";

const Menu = () => {
  const [display, setDisplay] = useState("none");
  const onClick = () => {
    if (display === "none") {
      setDisplay("block");
    } else if (display === "block") {
      setDisplay("none");
    }
  };

  return (
    <div className="menu">
      <ul className="menu-list">
        <li onClick={onClick} className="menu-items item-1 submenu-wpr">
          <span>파일</span>
          <div
            className="submenu__content"
            style={{
              display,
            }}
          >
            <p
              onClick={() => {
                const remote = window.require("@electron/remote");
                let w = remote.getCurrentWindow();
                w.reload();
              }}
            >
              새로고침
            </p>
            <p
              onClick={() => {
                const remote = window.require("@electron/remote");
                let w = remote.getCurrentWindow();
                w.close();
              }}
            >
              종료
            </p>
          </div>
        </li>
        <li className="menu-items item-2">편집</li>
        <li className="menu-items item-3">보기</li>
        <li className="menu-items item-4">창</li>
        <li className="menu-items item-4">도움말</li>
      </ul>
    </div>
  );
};

export default Menu;
