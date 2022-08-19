import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ForgetPassword, ResetPassword, SignIn, SignUp } from './pages/auth';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { DEFAULT_THEME, MyGlobalStyle } from './theme';

function App() {
	return (
		<MantineProvider withNormalizeCSS withGlobalStyles theme={DEFAULT_THEME}>
			<MyGlobalStyle />
			<ColorSchemeProvider colorScheme='dark'>
				<Router>
					<Routes>
						<Route path='/forget-password' element={<ForgetPassword />} />
						<Route path='/singin' element={<SignIn />} />
						<Route path='/shinup' element={<SignUp />} />
						<Route path='/ResetPassword' element={<ResetPassword />} />
					</Routes>
				</Router>
			</ColorSchemeProvider>
		</MantineProvider>
	);
}

export default App;
