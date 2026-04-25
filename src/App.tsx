import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";

import BoothPage from "./routes/Booth";
import ArtistPage from "./routes/Artist";
import SchedulePage from "./routes/Schedule";
import NoticePage from "./routes/Notice/Notice";
import NoticeAllPage from "./routes/Notice/NoticeAll";
import NoticeDetail from "./routes/Notice/NoticeDetail";
import NoticeImageDetail from "./routes/Notice/NoticeImageDetail";
import ContestPage from "./routes/Contest";

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
              activeTab="schedule"
            >
              <SchedulePage />
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
        <Route
          path="contest"
          element={
            <AppLayout
              title="청춘 한 컷"
              subtitle="근화제 사진 콘테스트"
              showBackButton={true}
              showNavBar={false}
              activeTab="notice"
            >
              <ContestPage />
            </AppLayout>
          }
        />
        <Route path="/notice/:id/image" element={<NoticeImageDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
