import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
    
import BoothPage from "./routes/Booth";
import ArtistPage from "./routes/Artist";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/booth" element={<BoothPage />} />
        <Route path="/artist" element={<ArtistPage />} />
      </Routes>
    </Router>
  );
}

export default App;
