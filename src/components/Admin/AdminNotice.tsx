import { useEffect, useState } from "react";
import * as S from "../../styles/AdminNotice.styles";
import chevronRight from "../../assets/Admin/ChevronRight.svg";
import { useNavigate } from "react-router-dom";
import { getAdminToken } from "../../utils/Admin";
import adminNoticesData from "../../data/AdminJson/adminNotices.json";

type NoticeCategory = "NOTICE" | "PERFORMANCE" | "EVENT" | "ETC";

interface Notice {
  id: number;
  category: NoticeCategory;
  title: string;
  urgent: boolean;
  createdAt: string;
  viewCount?: number;
}

const CATEGORY_LABEL: Record<NoticeCategory, string> = {
  NOTICE: "안내",
  PERFORMANCE: "공연",
  EVENT: "이벤트",
  ETC: "기타",
};

export default function AdminNotice() {
  const navigate = useNavigate();

  // 백 API 아카이빙으로 인해 사용하지 않음
  // const API_URL = import.meta.env.VITE_API_URL;

  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const token = getAdminToken();

    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/AdminLogin");
      return;
    }

    // 기존 백 API 연동 코드
    /*
    const fetchNotices = async () => {
      try {
        const response = await fetch(`${API_URL}/api/admin/notices`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok || !data.isSuccess) {
          alert(data.message || "공지사항을 불러오지 못했습니다.");
          return;
        }

        setNotices(data.result);
      } catch (error) {
        console.error(error);
        alert("공지사항 조회 중 오류가 발생했습니다.");
      }
    };

    fetchNotices();
    */

    setNotices(adminNoticesData.result as Notice[]);
  }, [navigate]);

  const handleClearEmergency = () => {
    // 기존 백 API 연동 코드
    /*
    const handleClearEmergency = async () => {
      try {
        const token = getAdminToken();

        if (!token) {
          alert("로그인이 필요합니다.");
          navigate("/AdminLogin");
          return;
        }

        const response = await fetch(
          `${API_URL}/api/admin/notices/urgent/clear`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok || !data.isSuccess) {
          alert(data.message || "긴급공지 해제에 실패했습니다.");
          return;
        }

        alert("모든 긴급공지가 해제되었습니다.");

        setNotices((prev) =>
          prev.map((notice) => ({
            ...notice,
            urgent: false,
          })),
        );
      } catch (error) {
        console.error(error);
        alert("긴급공지 해제 중 오류가 발생했습니다.");
      }
    };
    */

    setNotices((prev) =>
      prev.map((notice) => ({
        ...notice,
        urgent: false,
      }))
    );

    alert("화면에서 모든 긴급공지가 해제되었습니다.");
  };

  const handleNoticeClick = (noticeId: number) => {
    navigate(`/AdminNoticeDetail/${noticeId}`);
  };

  const handleWriteClick = () => {
    navigate("/AdminNoticeWrite");
  };

  const handleContestResultClick = () => {
    navigate("/AdminContestResult");
  };

  return (
    <S.Page>
      <S.TopArea>
        <S.ContestResultButton type="button" onClick={handleContestResultClick}>
          청춘 한 컷 현황 보러가기
        </S.ContestResultButton>
      </S.TopArea>

      <S.NoticeList>
        {notices.map((notice) => (
          <S.NoticeItem
            key={notice.id}
            type="button"
            onClick={() => handleNoticeClick(notice.id)}
          >
            <S.TextArea>
              <S.Category>
                {notice.urgent ? "[긴급] " : ""}
                {CATEGORY_LABEL[notice.category]}
              </S.Category>
              <S.Title>{notice.title}</S.Title>
            </S.TextArea>

            <S.Chevron src={chevronRight} alt="공지 상세보기" />
          </S.NoticeItem>
        ))}
      </S.NoticeList>

      <S.BottomArea>
        <S.ClearButton type="button" onClick={handleClearEmergency}>
          모든 긴급공지 해제
        </S.ClearButton>
        <S.WriteButton type="button" onClick={handleWriteClick}>
          공지작성하기
        </S.WriteButton>
      </S.BottomArea>
    </S.Page>
  );
}
