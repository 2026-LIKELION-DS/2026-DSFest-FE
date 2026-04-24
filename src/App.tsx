import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";

import BoothPage from "./routes/Booth";
import ArtistPage from "./routes/Artist";
import NoticePage from "./routes/Notice/Notice";
import NoticeAllPage from "./routes/Notice/NoticeAll";
import NoticeDetail from "./routes/Notice/NoticeDetail";
import NoticeImageDetail from "./routes/Notice/NoticeImageDetail";

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
          path="/notice"
          element={
            <AppLayout
              title="공지사항"
              subtitle="NOTICE"
              showBackButton={false}
              showNavBar={true}
              activeTab="notice"
            >
              <NoticePage />
            </AppLayout>
          }
        />
        <Route
          path="/notice/all"
          element={
            <AppLayout
              title="공지 전체보기"
              subtitle="NOTICE"
              showBackButton={true}
              showNavBar={true}
              activeTab="notice"
            >
              <NoticeAllPage />
            </AppLayout>
          }
        />
        <Route
          path="/notice/:id"
          element={
            <AppLayout
              title="공지 상세보기"
              subtitle="NOTICE"
              showBackButton={true}
              showNavBar={true}
              activeTab="notice"
            >
              <NoticeDetail />
            </AppLayout>
          }
        />
        <Route path="/notice/:id/image" element={<NoticeImageDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
