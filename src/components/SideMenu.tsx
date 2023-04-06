/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  ArrowDown,
  CaretLeft,
  CaretRight,
  House,
  Moon,
  Note,
  Notebook,
  PlusCircle,
  Sun,
} from "phosphor-react";

import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { auth } from "../services/firebase";

type SideMenuProps = {
  theme: string;
  setTheme: (theme: "light" | "dark") => void;
  user: any;
};

const SideMenuStyle = {
  self: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
    width: "280px",
    minHeight: "100vh",
    background: "var(--bg-primary)",
    color: "var(--text)",
    borderRight: "1px solid var(--text)",
    transition: "all .5s ease",
    "@media screen and (max-width: 768px)": css({
      width: "60px",
    }),
  }),
  settings: css({
    width: "100%",
    display: "flex",
    gap: "15px",
    marginTop: "1rem",
    alignItems: "center",
    justifyContent: "space-between",
    "@media screen and (max-width: 768px)": css({
      flexDirection: "column",
    }),
  }),
  theme: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingRight: "1rem",
    gap: "5px",
    svg: css({ cursor: "pointer" }),
    "@media screen and (max-width: 768px)": css({
      padding: "0",
      ">svg": css({ display: "none" }),
    }),
  }),
  user: css({
    display: "flex",
    alignItems: "center",
    gap: "5px",
    cursor: "pointer",
    paddingLeft: "1rem",
    position: "relative",
    img: css({
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      border: "1px solid var(--bg)",
      textAlign: "center",
    }),
    span: css({
      display: "flex",
      alignItems: "center",
      gap: "2px",
      fontSize: ".9rem",
    }),
    "&:hover >div": css({
      height: "26px",
    }),
    ">div": css({
      position: "absolute",
      top: "35px",
      width: "100%",
      height: "0",
      background: "var(--bg-primary)",
      overflow: "hidden",
      transition: "height .2s ease",
      button: css({
        border: "1px solid var(--text)",
        width: "100%",
        height: "100%",
        background: "transparent",
        color: "var(--text)",
        fontSize: "1rem",
        padding: ".1rem 0",
        cursor: "pointer",
        "&:hover": css({
          opacity: ".4",
        }),
      }),
    }),
    "@media screen and (max-width: 768px)": css({
      overflow: "visible",
      justifyContent: "center",
      paddingLeft: "1.5rem",
      ">div": css({ zIndex: "10" }),
    }),
  }),
  btns: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    marginTop: "1rem",
    width: "100%",
    a: css({
      padding: ".4rem .5rem",
      borderRadius: "20px",
      background: "var(--brand-color)",
      color: "var(--text)",
      textDecoration: "none",
      textTransform: "capitalize",
      width: "68%",
      transition: "background .2s ease",
      display: "flex",
      svg: css({
        opacity: "0",
      }),
      span: css({ width: "100%", padding: ".2rem 0" }),
      "&:hover": css({
        backgroundColor: "var(--brand-color-dark)",
        color: "#ccc",
      }),
      "@media screen and (max-width: 768px)": css({
        padding: ".4rem",
        svg: css({ opacity: "1" }),
        span: css({ width: "0", height: "0", opacity: "0" }),
      }),
    }),
  }),
  links: css({
    display: "flex",
    flexDirection: "column",
    marginTop: "2rem",
    alignItems: "start",
    fontSize: "1rem",
    width: "100%",
    gap: "15px",
    overflow: "hidden",
    a: css({
      color: "var(--text)",
      display: "flex",
      alignItems: "center",
      gap: "5px",
      textDecoration: "none",
      width: "100%",
      padding: ".5rem 1.5rem",
      "&:hover": css({
        background: "var(--brand-color)",
      }),
      "@media screen and (max-width: 768px)": css({
        padding: " 1rem 0 1rem 1rem",
        width: "auto",
        gap: "25px",
      }),
    }),
  }),
};

export const SideMenu = ({ theme, setTheme, user }: SideMenuProps) => {
  const [isMenuHide, setIsMenuHide] = useState<boolean>(false);
  const navigate = useNavigate();

  function handleUserSignOut() {
    auth
      .signOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleHideMenu() {
    setIsMenuHide(!isMenuHide);
  }

  return (
    <>
      <div css={SideMenuStyle.self} style={isMenuHide ? { width: "80px" } : {}}>
        <div
          css={SideMenuStyle.settings}
          style={isMenuHide ? { flexDirection: "column" } : {}}
        >
          <div
            css={SideMenuStyle.user}
            style={isMenuHide ? { width: "100%", padding: "0" } : {}}
          >
            <img
              src={user.photoURL}
              alt='avatar'
              referrerPolicy='no-referrer'
              style={isMenuHide ? { margin: "0 auto" } : {}}
            />
            <span style={isMenuHide ? { display: "none" } : {}}>
              {user.displayName}
              <ArrowDown size={18} weight='bold' />
            </span>
            <div style={isMenuHide ? { left: "0" } : {}}>
              <button onClick={handleUserSignOut}>sign out</button>
            </div>
          </div>
          <div
            css={SideMenuStyle.theme}
            style={isMenuHide ? { width: "100%", margin: "0 auto", padding: "0" } : {}}
          >
            <div onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
            </div>
            {isMenuHide ? (
              <CaretRight size={24} onClick={handleHideMenu} />
            ) : (
              <CaretLeft size={24} onClick={handleHideMenu} />
            )}
          </div>
        </div>
        <div css={SideMenuStyle.btns}>
          <Link
            to='/app/note-editor'
            style={
              isMenuHide
                ? {
                    textAlign: "center",
                    overflow: "hidden",
                  }
                : {}
            }
          >
            <PlusCircle
              size={28}
              weight='bold'
              style={
                isMenuHide
                  ? { opacity: "1", marginLeft: "5px", transform: "translateX(-15%)" }
                  : {}
              }
            />
            <span style={isMenuHide ? { opacity: "0", height: "0", width: "0" } : {}}>
              + new note
            </span>
          </Link>
        </div>
        <div css={SideMenuStyle.links}>
          <Link to='/app/home'>
            <House size={24} />
            {!isMenuHide && "Home"}
          </Link>
          <Link to='/app/notes'>
            <Note size={24} />
            {!isMenuHide && "Notes"}
          </Link>
          <Link to='#'>
            <Notebook size={24} />
            {!isMenuHide && "Collection"}
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};
