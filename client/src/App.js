import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/auth/signup/Signup.js";
import Signin from "./pages/auth/signin/Signin.js";
import ForgetPassword from "./pages/auth/forgetPassword/ForgetPassword.js";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
