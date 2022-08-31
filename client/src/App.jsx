import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  AuthLayout,
  ForgetPassword,
  ResetPassword,
  SignIn,
  SignUp,
  Confirmation,
} from './pages/auth';
import Messenger from './pages/messenger/Messenger';
import { DEFAULT_THEME, MyGlobalStyle } from './theme';

const queryClient = new QueryClient();

function App() {
  // const [colorScheme, setColorScheme] = useState("dark");
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider withNormalizeCSS withGlobalStyles theme={DEFAULT_THEME}>
          <MyGlobalStyle />
          <Router>
            <Routes>
              <Route path="auth" element={<AuthLayout />}>
                <Route path="forget-password" element={<ForgetPassword />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="confirmation" element={<Confirmation />} />
                <Route path="reset-password" element={<ResetPassword />} />
              </Route>
              <Route path="/messenger" element={<Messenger />} />
            </Routes>
          </Router>
        </MantineProvider>
      </ColorSchemeProvider>
      {/* React query devtools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
