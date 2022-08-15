import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

import Signup from "./pages/auth/signup/Signup.js";
import Signin from "./pages/auth/signin/Signin.js";
import ForgetPassword from "./pages/auth/forgetPassword/ForgetPassword.js";
import ResetPassword from "./pages/auth/resetPassword/ResetPassword.js";

import "./App.scss";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
