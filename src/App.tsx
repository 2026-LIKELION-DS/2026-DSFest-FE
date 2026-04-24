import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";

import BoothPage from "./routes/Booth";
import ArtistPage from "./routes/Artist";
import HomePage from "./routes/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout
              title="청춘"
              subtitle="2026 근화제"
              showBackButton={false}
              showNavBar={true}
            >
              <HomePage />
            </AppLayout>
          }
        />
        <Route
          path="/booth"
          element={
            <AppLayout
              title="부스"
              subtitle="BOOTH"
              showBackButton={true}
              showNavBar={false}
            >
              <BoothPage />
            </AppLayout>
          }
        />

        <Route
          path="/artist"
          element={
            <AppLayout
              title="아티스트"
              subtitle="ARTIST"
              showBackButton={true}
              showNavBar={false}
            >
              <ArtistPage />
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
