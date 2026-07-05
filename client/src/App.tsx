import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

const App = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/todos" replace />} />
      <Route path="/todos" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
