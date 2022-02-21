import React, { useEffect, useState } from "react";
import { authService, firestore } from "../firebase";
import $ from "jquery";
import { SizedBox, RowCentered } from "../layout";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [newAccount, setNewAccount] = useState(false);

  useEffect(() => {
    $("*").css({
      "box-sizing": "border-box",
    });
    $("html").css({
      "background-color": "#56baed",
    });
    $("body").css({
      "font-family": '"Poppins", sans-serif',
      height: "100vh",
    });
    $("a").css({
      color: "#92badd",
      display: "inline-block",
      "text-decoration": "none",
      "font-weight": "400",
    });
    $("h2").css({
      "text-align": "center",
      "font-size": "16px",
      "font-weight": "600",
      "text-transform": "uppercase",
      display: "inline-block",
      margin: "40px 8px 10px 8px",
      color: "#cccccc",
    });
  }, []);

  const onGoogleClick = async () => {
    try {
      const data = await authService().signInWithPopup(
        new authService.GoogleAuthProvider()
      );
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const signInWithKaKao = async () => {
    try {
      const { dialog } = window.require("@electron/remote");
      dialog.showMessageBox(null, getOptions("지원 예정입니다."));
      // const clientState = v4();
      // const rest_api_key = "c999dbf2a975a0869752d03a62282ad9";
      // const redirect_url =
      //   "https://repeated-best-tuba.glitch.me/callbacks/kakao/sign_in";
      // const token_url =
      //   "https://repeated-best-tuba.glitch.me/callbacks/kakao/sign_in";
      // const kakao_auth_url = uri(
      //   "https://kauth.kakao.com/oauth/authorize"
      // ).query({
      //   response_type: "code",
      //   client_id: rest_api_key,
      //   response_mode: "form_post",
      //   redirect_uri:
      //     "https://repeated-best-tuba.glitch.me/callbacks/kakao/sign_in",
      //   scope: "profile_nickname profile_image account_email",
      //   state: clientState,
      // });

      // let win = window.open(kakao_auth_url.toString());

      // const { BrowserWindow, ipcMain } = window.require("@electron/remote");

      // let win = new BrowserWindow({
      //   width: 600,
      //   height: 800,
      //   // resizable: false,
      //   webPreferences: {
      //     contextIsolation: false,
      //     nodeIntegration: true,
      //     enableRemoteModule: true,
      //   },
      // });

      // win.webContents.openDevTools();

      // win.loadURL(kakao_auth_url.toString());

      //   const body = Uri.parse(result).queryParameters;

      //   const tokenUrl = Uri.https(
      //   'kauth.kakao.com',
      //   '/oauth/token',
      //   {
      //     'grant_type': 'authorization_code',
      //     'client_id': "c999dbf2a975a0869752d03a62282ad9",
      //     'redirect_uri':
      //         'https://repeated-best-tuba.glitch.me/callbacks/kakao/sign_in',
      //     'code': body["code"],
      //   },
      // );
      // var responseTokens = await http.post(tokenUrl);
      // Map<String, dynamic> bodys = json.decode(responseTokens.body);
      // var response = await http.post(
      //   Uri.https('repeated-best-tuba.glitch.me', '/callbacks/kakao/token'),
      //   body: {
      //     "accessToken": bodys['access_token'],
      //   },
      // );
      // var _email = (await http.post(
      //   Uri.https('repeated-best-tuba.glitch.me', '/callbacks/kakao/get_email'),
      //   body: {
      //     "accessToken": bodys['access_token'],
      //   },
      // ))
      //     .body;
      // return {
      //   "userCredential":
      //       await FirebaseAuth.instance.signInWithCustomToken(response.body),
      //   "email": _email,
      // };
    } catch (e) {
      console.log(e);
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "nickname") {
      setNickname(value);
    }
  };

  const getMessageFromErrorCode = (errorCode) => {
    switch (errorCode) {
      case "auth/ERROR_EMAIL_ALREADY_IN_USE":
      case "auth/account-exists-with-different-credential":
      case "auth/email-already-in-use":
        return "이미 사용중인 이메일입니다.";
      case "auth/ERROR_WRONG_PASSWORD":
      case "auth/wrong-password":
        return "패스워드가 틀립니다.";
      case "auth/ERROR_USER_NOT_FOUND":
      case "auth/user-not-found":
        return "존재하지 않는 유저입니다.";
      case "auth/ERROR_USER_DISABLED":
      case "auth/user-disabled":
        return "블록당한 유저입니다.";
      case "auth/ERROR_TOO_MANY_REQUESTS":
      case "auth/operation-not-allowed":
        return "요청이 너무 많습니다. 나중에 다시 시도하세요.";
      case "auth/ERROR_OPERATION_NOT_ALLOWED":
        return "서버가 응답하지 않습니다. 나중에 다시 시도하세요.";
      case "auth/ERROR_INVALID_EMAIL":
      case "auth/invalid-email":
        return "유효하지 않은 이메일입니다.";
      default:
        return "로그인/회원가입에 실패하였습니다. 나중에 다시 시도하세요.";
    }
  };

  const getOptions = (msg) => {
    return {
      type: "question", //종류
      buttons: ["확인"], //버튼 스타일
      defaultId: 1, //고유 아이디
      title: "error", //제목
      message: "알림",
      detail: msg,
      checkboxChecked: false, //체크박스(메시지를 저장합니다 이런 기능)
    };
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { dialog } = window.require("@electron/remote");

    try {
      let data;
      if (newAccount) {
        data = await authService().createUserWithEmailAndPassword(
          email,
          password
        );
        await data.user.sendEmailVerification();
        await firestore.collection("user").doc(data.user.email).set({
          userType: "선생님",
          닉네임: nickname,
        });
        dialog.showMessageBox(null, getOptions("인증 이메일을 보냈습니다."));
      } else {
        if (
          (await firestore.collection("user").doc(email).get()).data()[
            "userType"
          ] === "학부모"
        ) {
          dialog.showMessageBox(
            null,
            getOptions("학부모 계정으로 로그인할 수 없는 서비스입니다.")
          );
          return;
        }
        data = await authService().signInWithEmailAndPassword(email, password);
        if (data.user.emailVerified) {
          const remote = window.require("@electron/remote");
          let w = remote.getCurrentWindow();
          w.close();
        } else {
          dialog.showMessageBox(
            null,
            getOptions("이메일이 인증되지 않았습니다.")
          );
        }
      }
    } catch (e) {
      const errorMsg = getMessageFromErrorCode(e.code);
      dialog.showMessageBox(null, getOptions(errorMsg));
    }
  };

  const toggleAccount = () => {
    setEmail("");
    setPassword("");
    setNickname("");
    setNewAccount((prev) => !prev);
  };

  return (
    <div className="login_form__wrapper fadeInDown">
      <div id="formContent">
        <h2
          onClick={newAccount ? toggleAccount : () => {}}
          className={`login_form__${
            newAccount ? "inactive underlineHover" : "active"
          }`}
        >
          로그인
        </h2>
        <h2
          onClick={newAccount ? () => {} : toggleAccount}
          className={`login_form__${
            newAccount ? "active" : "inactive underlineHover"
          }`}
        >
          회원가입
        </h2>
        <form
          className="login_form__input_section"
          onSubmit={async (e) => {
            await onSubmit(e);
          }}
        >
          <input
            value={email}
            onChange={onChange}
            type="text"
            id="email"
            className="login_form__fadeIn second"
            name="email"
            placeholder="이메일"
          />
          <input
            value={password}
            onChange={onChange}
            type="password"
            id="password"
            className="login_form__fadeIn third"
            name="password"
            placeholder="패스워드"
          />
          {newAccount ? (
            <input
              value={nickname}
              style={{
                boxSizing: "border-box",
              }}
              onChange={onChange}
              type="text"
              id="nickname"
              className="login_form__fadeIn fourth"
              name="nickname"
              placeholder="닉네임"
            />
          ) : (
            <div />
          )}
          <RowCentered>
            {/* <span
              onClick={async () => {
                await onGoogleClick();
              }}
            >
              <svg
                height="30px"
                width="30px"
                viewBox="0 0 533.5 544.3"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                  fill="#4285f4"
                />
                <path
                  d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                  fill="#34a853"
                />
                <path
                  d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                  fill="#fbbc04"
                />
                <path
                  d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                  fill="#ea4335"
                />
              </svg>
            </span>
            <SizedBox width="10px" /> */}
            <span onClick={signInWithKaKao}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                width="30px"
                viewBox="0 0 208 191.94"
              >
                <g>
                  <polygon
                    className="cls-1"
                    points="76.01 89.49 87.99 89.49 87.99 89.49 82 72.47 76.01 89.49"
                    fill="#000"
                  />
                  <path
                    className="cls-1"
                    d="M104,0C46.56,0,0,36.71,0,82c0,29.28,19.47,55,48.75,69.48-1.59,5.49-10.24,35.34-10.58,37.69,0,0-.21,1.76.93,2.43a3.14,3.14,0,0,0,2.48.15c3.28-.46,38-24.81,44-29A131.56,131.56,0,0,0,104,164c57.44,0,104-36.71,104-82S161.44,0,104,0ZM52.53,69.27c-.13,11.6.1,23.8-.09,35.22-.06,3.65-2.16,4.74-5,5.78a1.88,1.88,0,0,1-1,.07c-3.25-.64-5.84-1.8-5.92-5.84-.23-11.41.07-23.63-.09-35.23-2.75-.11-6.67.11-9.22,0-3.54-.23-6-2.48-5.85-5.83s1.94-5.76,5.91-5.82c9.38-.14,21-.14,30.38,0,4,.06,5.78,2.48,5.9,5.82s-2.3,5.6-5.83,5.83C59.2,69.38,55.29,69.16,52.53,69.27Zm50.4,40.45a9.24,9.24,0,0,1-3.82.83c-2.5,0-4.41-1-5-2.65l-3-7.78H72.85l-3,7.78c-.58,1.63-2.49,2.65-5,2.65a9.16,9.16,0,0,1-3.81-.83c-1.66-.76-3.25-2.86-1.43-8.52L74,63.42a9,9,0,0,1,8-5.92,9.07,9.07,0,0,1,8,5.93l14.34,37.76C106.17,106.86,104.58,109,102.93,109.72Zm30.32,0H114a5.64,5.64,0,0,1-5.75-5.5V63.5a6.13,6.13,0,0,1,12.25,0V98.75h12.75a5.51,5.51,0,1,1,0,11Zm47-4.52A6,6,0,0,1,169.49,108L155.42,89.37l-2.08,2.08v13.09a6,6,0,0,1-12,0v-41a6,6,0,0,1,12,0V76.4l16.74-16.74a4.64,4.64,0,0,1,3.33-1.34,6.08,6.08,0,0,1,5.9,5.58A4.7,4.7,0,0,1,178,67.55L164.3,81.22l14.77,19.57A6,6,0,0,1,180.22,105.23Z"
                    fill="#000"
                  />
                </g>
              </svg>
            </span>
          </RowCentered>
          <input
            type="submit"
            className="login_form__fadeIn fifth"
            value="로그인"
          />
        </form>
        <div id="formFooter">
          <a className="login_form__underlineHover" href="#">
            비밀번호를 잊으셨나요?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
