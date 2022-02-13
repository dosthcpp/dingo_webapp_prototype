import React, { useState } from "react";
import { authService } from "../firebase";
import firebase from "firebase/compat/app";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onGoogleClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebase.auth.GoogleAuthProvider();
    }
    const data = await authService().signInWithPopup(provider);
    console.log(data);
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const setE = (error) => {
      setError(error);
      setTimeout(() => {
        setError("");
      }, 2000);
    };
    try {
      let data;
      if (newAccount) {
        data = await authService().createUserWithEmailAndPassword(
          email,
          password
        );
        await data.user.sendEmailVerification();
        setE("인증 이메일을 보냈습니다.");
      } else {
        data = await authService().signInWithEmailAndPassword(email, password);
        if (data.user.emailVerified) {
          console.log("sex");
        } else {
          setE("이메일이 인증되지 않았습니다.");
        }
      }
    } catch (e) {
      switch (e.code) {
        case "auth/wrong-password":
          setE("비밀번호가 틀렸습니다.");
          break;
        case "auth/email-already-in-use":
          setE("사용중인 이메일입니다.");
          break;
        case "auth/weak-password":
          setE("비밀번호가 빈약합니다. 강력한 비밀번호를 지정하세요.");
          break;
        default:
          console.log(e);
          break;
      }
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <span onClick={toggleAccount}>
          {newAccount ? "Create Account" : "Login"}
        </span>
        <div>{error}</div>
        <input
          name="email"
          type="email"
          placeholder="이메일 주소"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value="로그인" />
      </form>
    </div>
  );
};

export default LoginForm;
