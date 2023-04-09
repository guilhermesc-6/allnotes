/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import {
  browserLocalPersistence,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  User,
} from "firebase/auth";
import { auth } from "../services/firebase";

import logo from "../assets/logo.png";
import logoGoogle from "../assets/google.png";
import { useNavigate } from "react-router-dom";

const signInStyle = {
  self: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 auto",
    backgroundColor: "#fff",
    width: "420px",
    minHeight: "100vh",
    boxShadow: " 0px 4px 24px rgba(0, 0, 0, 0.1)",
    justifyContent: "space-evenly",
    "@media screen and (max-width: 480px)": css({
      background: "rgba(0, 129, 204, 0.2)",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
      backdropFilter: "blur(3.2px)",
      "-webkit-backdrop-filter": "blur(3.2px)",
      border: "1px solid rgba(0, 129, 204, 0.34)",
    }),
  }),
  logo: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
    marginTop: "1rem",
    img: css({
      width: "60px",
    }),
  }),
  title: css({
    fontSize: "2.5rem",
    fontWeight: "bold",
  }),
  subtitle: css({
    fontSize: ".9rem",
  }),
  signinButton: css({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: ".5rem 2rem",
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "1px solid #000",
    borderRadius: "5px",
    transition: "background .2s ease",
    "&:hover": css({
      backgroundColor: "var(--bg)",
    }),
  }),
  buttonImg: css({
    width: "24px",
  }),
};

type SignInProps = {
  setUser: (user: User) => void;
};

export const SignIn = ({ setUser }: SignInProps) => {
  const navigate = useNavigate();

  function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();

    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithPopup(auth, provider)
          .then((res) => {
            setUser(res.user);
            navigate("/app/home");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  return (
    <div css={signInStyle.self}>
      <div css={signInStyle.logo}>
        <img src={logo} alt='AllNotes logo' loading='lazy' />
        <span css={signInStyle.title}>AllNotes</span>
        <span css={signInStyle.subtitle}>Remember everything.</span>
      </div>
      <div>
        <button css={signInStyle.signinButton} onClick={handleGoogleSignIn}>
          <img
            src={logoGoogle}
            alt='Logo google'
            loading='lazy'
            css={signInStyle.buttonImg}
          />
          Continue with Google.
        </button>
      </div>
    </div>
  );
};
