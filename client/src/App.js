import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  AuthLayout,
  ForgetPassword,
  ResetPassword,
  SignIn,
  SignUp,
} from "./pages/auth";
import { DEFAULT_THEME, MyGlobalStyle } from "./theme";

function App() {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles theme={DEFAULT_THEME}>
      <MyGlobalStyle />
      <ColorSchemeProvider colorScheme="dark">
        <Router>
          <Routes>
            <Route path="auth" element={<AuthLayout />}>
              <Route path="forget-password" element={<ForgetPassword />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="reset-password" element={<ResetPassword />} />
            </Route>
          </Routes>
        </Router>
      </ColorSchemeProvider>
    </MantineProvider>
  );
}

export default App;
