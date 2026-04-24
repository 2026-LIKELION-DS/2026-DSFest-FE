import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";

import BoothPage from "./routes/Booth";
import ArtistPage from "./routes/Artist";
import SchedulePage from "./routes/Schedule";

function App() {
  return (
    <Router>
      <Routes>
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

        <Route
          path="/schedule"
          element={
            <AppLayout
              title="일정표"
              subtitle="TIME TABLE"
              showBackButton={false}
              showNavBar={true}
            >
              <SchedulePage />
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
