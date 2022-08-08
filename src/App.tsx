import { Global } from "@emotion/react";

import { SignIn } from "./pages/SignIn";
import { Home } from "./pages/Home";
import { SideMenu } from "./components/SideMenu";

import bg from "./assets/bg-grid.svg";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState<string>("light");
  return (
    <>
      <Global
        styles={`
          :root {
            --brand-color: #0080cc;
            --bg: #e0e0e2;
            --bg-primary: #F1F2F9;
            --brand-color-dark:#001A29;
            --text:#141415
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
            ${theme === "dark" && "--text:#EAEAEB; --bg-primary:#0D0F1C"}
          }
        `}
      />
      {/* <SignIn /> */}
      <SideMenu theme={theme} setTheme={setTheme} />
      <Home />
    </>
  );
}

export default App;
