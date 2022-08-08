/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { formatDate } from "../utils/formatDate";

const HomeStyle = {
  self: css({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    position: "relative",
    backgroundColor: "var(--bg-primary)",
    "&::before": css({
      content: "''",
      width: "100%",
      height: "60%",
      backgroundColor: "#fefefe",
      background:
        "url(https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1) no-repeat center",
      backgroundSize: "cover",
      position: "absolute",
    }),
    ">div": css({
      zIndex: "10",
      backgroundColor: "rgba(234, 234, 235,.2)",
      height: "100%",
    }),
  }),
  header: css({
    display: "flex",
    justifyContent: "space-between",
    padding: ".2rem 1rem",
    fontSize: "1.3rem",
    color: "var(--text)",
    "span:last-child": css({
      fontSize: "1rem",
      marginRight: "2.5rem",
    }),
  }),
  widgets: css({
    marginTop: "15rem",
  }),
};

export const Home = () => {
  return (
    <div css={HomeStyle.self}>
      <div>
        <header css={HomeStyle.header}>
          <span>
            {new Date().getHours() < 12
              ? "Good Morning"
              : new Date().getHours() > 18
              ? "Good Night"
              : "Good Afternoon"}
            , Guilherme
          </span>
          <span>{formatDate(new Date().toString())}</span>
        </header>
        <div css={HomeStyle.widgets}>
          <div>Notas</div>
          <div>Rascunho</div>
        </div>
      </div>
    </div>
  );
};
