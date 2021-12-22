import React from "react";
import 로고 from "../icons/dingoLogo.png";

const header = () => {
  return (
    <div
      style={{
        height: "3rem",
        width: "5rem",
        marginTop: "-2rem",
      }}
    >
      <img
        src={로고}
        alt="Hello"
        style={{
          width: "5rem",
        }}
      />
    </div>
  );
};

export default header;
