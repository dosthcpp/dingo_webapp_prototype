import React from "react";
<<<<<<< HEAD
import { authService } from "../firebase";
=======
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
import { RowCentered, Column, SizedBox, Row } from "../layout";

const MyPage = () => {
  return (
    <div className="my_profile">
      <Column
        style={{
          width: "100%",
        }}
      >
        <div className="my_profile-header">
          <div className="my_profile__title">마이페이지</div>
        </div>
        <SizedBox height="30px" />
        <RowCentered>
          <div className="my_profile__circular_image">
            <img src={require("../image/placeholder2.jpeg")} alt="img" />
          </div>
          <SizedBox width="20px" />
          <Column>
<<<<<<< HEAD
            <div className="my_profile__kind">희망 유치원</div>
            <div className="my_profile__email">
              {authService().currentUser.email}
            </div>
=======
            <div className="my_profile__kind">새싹 유치원</div>
            <div className="my_profile__email">abcd1234@gmail.com</div>
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
            <SizedBox height="20px" />
            <Row>
              <Column>
                <div>개설일</div>
                <div>원장</div>
              </Column>
              <SizedBox width="20px" />
              <Column>
                <div>2012.08.04</div>
                <div>백도연</div>
              </Column>
            </Row>
          </Column>
        </RowCentered>
      </Column>
    </div>
  );
};

export default MyPage;
