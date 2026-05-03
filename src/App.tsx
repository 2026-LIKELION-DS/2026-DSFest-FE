import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ReactGA from "react-ga4";

import AppLayout from "./layouts/AppLayout";

import BoothPage from "./routes/Booth";
import ArtistPage from "./routes/Artist";
import HomePage from "./routes/Home";
import SchedulePage from "./routes/Schedule";
import NoticePage from "./routes/Notice/Notice";
import NoticeAllPage from "./routes/Notice/NoticeAll";
import NoticeDetail from "./routes/Notice/NoticeDetail";
// import NoticeImageDetail from "./routes/Notice/NoticeImageDetail";
import ContestPage from "./routes/Contest";
// import ImageDetailPage from "./components/Common/ImageDetail";
import LiveTalk from "./routes/LiveTalk";
import Error from "./routes/Error";
import Food from "./routes/Food";
import ContestVote from "./routes/ContestVote";
import AdminLoginPage from "./routes/Admin/AdminLoginPage";
import AdminNoticePage from "./routes/Admin/AdminNoticePage";
import AdminNoticeDetailPage from "./routes/Admin/AdminNoticeDetailPage";
import AdminNoticeWritePage from "./routes/Admin/AdminNoticeWritePage";

function GAListener() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname,
    });
  }, [location.pathname]);

  return null;
}

function App() {
  useEffect(() => {
    ReactGA.initialize("G-M12VCHRWYB");
  }, []);

  return (
    <Router>
      <GAListener />
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
          path="/contest"
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
        {/* <Route path="/notice/:id/image" element={<NoticeImageDetail />} /> */}
        {/* <Route
          path="/image-detail/:targetType/:targetId"
          element={<ImageDetailPage />}
        /> */}
        <Route
          path="/livetalk"
          element={
            <AppLayout
              title="라이브톡"
              subtitle="LIVE TALK"
              showBackButton={false}
              showNavBar={true}
              activeTab="livetalk"
            >
              <LiveTalk />
            </AppLayout>
          }
        />
        <Route path="*" element={<Error />} />
        <Route
          path="/foodtruck"
          element={
            <AppLayout
              title="푸드트럭"
              subtitle="FOOD TRUCK"
              showBackButton={true}
              showNavBar={false}
            >
              <Food />
            </AppLayout>
          }
        />
        <Route
          path="/contest/vote"
          element={
            <AppLayout
              title="투표하기"
              subtitle="근화제 사진 콘테스트"
              showBackButton={true}
              showNavBar={false}
            >
              <ContestVote />
            </AppLayout>
          }
        />
        <Route path="/AdminLogin" element={<AdminLoginPage />} />
        <Route path="/AdminNotice" element={<AdminNoticePage />} />
        <Route
          path="/AdminNoticeDetail/:noticeId"
          element={
            <AppLayout
              title="공지 상세보기"
              showBackButton={true}
              showNavBar={false}
            >
              <AdminNoticeDetailPage />
            </AppLayout>
          }
        />
        <Route
          path="/AdminNoticeWrite"
          element={
            <AppLayout title="공지" showBackButton={true} showNavBar={false}>
              <AdminNoticeWritePage />
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
