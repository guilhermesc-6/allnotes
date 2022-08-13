import { Global } from "@emotion/react";
import bg from "./assets/bg-grid.svg";

import { SignIn } from "./pages/SignIn";
import { Home } from "./pages/Home";
import { SideMenu } from "./components/SideMenu";
import { NoteEditor } from "./components/NoteEditor";
import { Notes } from "./pages/Notes";

import { useEffect, useState } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    //watches for changes in the colors theme of the browser
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        const newColorScheme = event.matches ? "dark" : "light";
        setTheme(newColorScheme);
      });
    //verify the themes settings of the user
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
    }
  }, []);

  return (
    <>
      <Global
        styles={`
          :root {
            --brand-color: #0080cc;
            --bg: #e0e0e2;
            --bg-primary: #F1F2F9;
            --brand-color-dark:#001A29;
            --text:#141415;
            --background-image: url(https://images.pexels.com/photos/234602/pexels-photo-234602.jpeg);
            --note-bg: #CAC4B9;
            --note-card: #B0A796;
            --scratch-bg: #C2BBAE;
            --editor-bg: #E7E7EE;
          }
          * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            font-family: "Roboto", sans-serif;
            transition: all .4s ease;
          }

          body {
            background-image: url("${bg}");
            background-color: var(--bg);
            background-blend-mode: overlay;
          }
          #root{
            max-width:100vw;
            display:flex;
            ${
              theme === "dark" &&
              `--text:#EAEAEB; 
              --bg-primary:#0D0F1C; 
              --note-bg: #17181F; 
              --note-card: #23242F; 
              --scratch-bg: #3D3E52; 
              --editor-bg: #2B2B3B;
              `
            }
          }
        `}
      />
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<SignIn />} />
          <Route
            path='/'
            element={<SideMenu theme={theme} setTheme={setTheme} />}
          >
            <Route path='home' element={<Home />} />
            <Route path='notes' element={<Notes />} />
            <Route
              path='note-editor'
              element={<NoteEditor title='' text='' />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
