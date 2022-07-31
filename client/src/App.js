import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/auth/signup/Signup.js";
import Signin from "./pages/auth/signin/Signin.js";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
