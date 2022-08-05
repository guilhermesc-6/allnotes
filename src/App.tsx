import { Global } from "@emotion/react";

import { SignIn } from "./pages/SignIn";
import { Home } from "./pages/Home";
import { SideMenu } from "./components/SideMenu";

import bg from "./assets/bg-grid.svg";

function App() {
  return (
    <>
      <Global
        styles={`
          :root {
            --brand-color: #0080cc;
            --bg: #e0e0e2;
            --dark-blue: #1B1F3B
          }
          * {
            padding: 0;
            margin: 0;
            box-sizing: boder-box;
            font-family: "Roboto", sans-serif;
          }

          body {
            background-image: url("${bg}");
            background-color: var(--bg);
            background-blend-mode: overlay;
          }
          #root{
            display:flex;
          }
        `}
      />
      {/* <SignIn /> */}
      <SideMenu />
      <Home />
    </>
  );
}

export default App;
