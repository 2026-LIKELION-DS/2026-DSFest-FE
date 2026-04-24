import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BoothPage from "./routes/Booth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/booth" element={<BoothPage />} />
      </Routes>
    </Router>
  );
}

export default App;
