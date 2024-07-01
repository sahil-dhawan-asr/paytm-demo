import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
