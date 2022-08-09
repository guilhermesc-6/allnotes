/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { CaretDoubleRight } from "phosphor-react";

import { Notes } from "../components/Notes";

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
      backgroundImage: "var(--background-image)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
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
    display: "flex",
    gap: "10px",
    padding: "0 2rem",
  }),
  notes: css({
    width: "800px",
    border: "1px solid var(--bg-primary)",
    borderRadius: "10px",
    background: "var(--note-bg)",
    padding: ".5rem",
    a: css({
      display: "flex",
      alignItems: "center",
      gap: "5px",
      fontSize: "1.5rem",
      textDecoration: "none",
      color: "var(--text)",
    }),
  }),
  notesSlider: css({
    display: "flex",
    gap: "10px",
    padding: "1rem .5rem",
    overflowX: "auto",
    width: "100%",
  }),
};

export const Home = () => {
  const note = [
    {
      title: "tarefas",
      text: "sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi",
      edited_at: "09 de aug",
    },
    {
      title: "tarefas",
      text: "sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi",
      edited_at: "09 de aug",
    },
    {
      title: "tarefas",
      text: "sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi",
      edited_at: "09 de aug",
    },
    {
      title: "tarefas",
      text: "sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi",
      edited_at: "09 de aug",
    },
    {
      title: "tarefas",
      text: "sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi",
      edited_at: "09 de aug",
    },
    {
      title: "tarefas",
      text: "sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi",
      edited_at: "09 de aug",
    },
    {
      title: "tarefas",
      text: "sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi",
      edited_at: "09 de aug",
    },
  ];

  return (
    <div
      css={HomeStyle.self}
      // style={{
      //   ["--background-image" as any]:
      //     "url(https://images.pexels.com/photos/292475/pexels-photo-292475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
      // }}
    >
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
          <div css={HomeStyle.notes}>
            <a href='#'>
              Notes <CaretDoubleRight size={24} color='#E0E0E2' />
            </a>
            <div css={HomeStyle.notesSlider}>
              {note.map((note) => {
                return (
                  <Notes
                    title={note.title}
                    text={note.text}
                    edited_at={note.edited_at}
                  />
                );
              })}
            </div>
          </div>
          <div>Rascunho</div>
        </div>
      </div>
    </div>
  );
};
