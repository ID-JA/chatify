import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ForgetPassword, ResetPassword, SignIn, SignUp } from "./pages/auth";
import Messenger from "./pages/messenger/Messenger";
import { useState } from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { DEFAULT_THEME, MyGlobalStyle } from "./theme";

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{ ...DEFAULT_THEME, colorScheme }}
      >
        <MyGlobalStyle />
        <Router>
          <Routes>
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/singin" element={<SignIn />} />
            <Route path="/shinup" element={<SignUp />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="/messenger" element={<Messenger />} />
          </Routes>
        </Router>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
