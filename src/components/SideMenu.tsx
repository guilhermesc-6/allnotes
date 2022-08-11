/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import {
  ArrowDown,
  CaretLeft,
  House,
  Moon,
  Note,
  Notebook,
  Sun,
} from "phosphor-react";
import { Outlet } from "react-router-dom";

type SideMenuProps = {
  theme: string;
  setTheme: any;
};

const SideMenuStyle = {
  self: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
    width: "280px",
    height: "100vh",
    background: "var(--bg-primary)",
    color: "var(--text)",
    borderRight: "1px solid var(--text)",
  }),
  settings: css({
    width: "100%",
    display: "flex",
    gap: "15px",
    marginTop: "1rem",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  theme: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingRight: "1rem",
    gap: "5px",
    svg: css({ cursor: "pointer" }),
  }),
  user: css({
    display: "flex",
    alignItems: "center",
    gap: "5px",
    cursor: "pointer",
    paddingLeft: "1rem",
    img: css({
      width: "50px",
      borderRadius: "50%",
      border: "1px solid var(--bg)",
    }),
    span: css({
      display: "flex",
      alignItems: "center",
      gap: "2px",
    }),
  }),
  btns: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    marginTop: "2rem",
    width: "100%",
    input: css({
      padding: ".4rem .5rem",
      border: "none",
      borderRadius: "20px",
      background: "var(--bg)",
      "&::placeholder": css({
        fontSize: ".8rem",
        textTransform: "uppercase",
      }),
    }),
    a: css({
      padding: ".4rem .5rem",
      borderRadius: "20px",
      background: "var(--brand-color)",
      color: "var(--text)",
      textDecoration: "none",
      textTransform: "capitalize",
      width: "68%",
      transition: "background .2s ease",
      "&:hover": css({
        backgroundColor: "var(--brand-color-dark)",
        border: "1px solid var(--brand-color)",
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
    }),
  }),
};

export const SideMenu = ({ theme, setTheme }: SideMenuProps) => {
  return (
    <>
      <div css={SideMenuStyle.self}>
        <div css={SideMenuStyle.settings}>
          <div css={SideMenuStyle.user}>
            <img src='https://github.com/guilhermesc-6.png' alt='avatar' />
            <span>
              Guilherme
              <ArrowDown size={14} weight='bold' />
            </span>
          </div>
          <div css={SideMenuStyle.theme}>
            <div onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
            </div>
            <CaretLeft size={24} />
          </div>
        </div>
        <div css={SideMenuStyle.btns}>
          <input type='text' id='search' placeholder='search' />
          <a href='#'>+ new note</a>
        </div>
        <div css={SideMenuStyle.links}>
          <a href='#'>
            <House size={24} /> Home
          </a>
          <a href='#'>
            <Note size={24} /> Notes
          </a>
          <a href='#'>
            <Notebook size={24} /> Collection
          </a>
        </div>
      </div>
      <Outlet />
    </>
  );
};
