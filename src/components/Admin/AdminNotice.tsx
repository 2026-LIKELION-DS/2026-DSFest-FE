import * as S from "../../styles/AdminNotice.styles";
import chevronRight from "../../assets/Admin/ChevronRight.svg";
import { useNavigate } from "react-router-dom";

interface Notice {
  id: number;
  category: string;
  title: string;
  isEmergency: boolean;
}

const mockNotices: Notice[] = [
  {
    id: 1,
    category: "무대",
    title: "공지 제목이 들어가는 자리",
    isEmergency: false,
  },
  {
    id: 2,
    category: "무대",
    title: "공지 제목이 들어가는 자리",
    isEmergency: false,
  },
  {
    id: 3,
    category: "무대",
    title: "공지 제목이 들어가는 자리",
    isEmergency: false,
  },
  {
    id: 4,
    category: "무대",
    title: "공지 제목이 들어가는 자리",
    isEmergency: false,
  },
  {
    id: 5,
    category: "무대",
    title: "공지 제목이 들어가는 자리",
    isEmergency: false,
  },
  {
    id: 6,
    category: "무대",
    title: "공지 제목이 들어가는 자리",
    isEmergency: false,
  },
  {
    id: 7,
    category: "무대",
    title: "공지 제목이 들어가는 자리",
    isEmergency: false,
  },
  {
    id: 8,
    category: "무대",
    title: "공지 제목이 들어가는 자리",
    isEmergency: false,
  },
  {
    id: 9,
    category: "무대",
    title: "공지 제목이 들어가는 자리",
    isEmergency: false,
  },
  {
    id: 10,
    category: "무대",
    title: "공지 제목이 들어가는 자리",
    isEmergency: false,
  },
  {
    id: 11,
    category: "무대",
    title: "공지 제목이 들어가는 자리",
    isEmergency: false,
  },
  {
    id: 12,
    category: "무대",
    title: "공지 제목이 들어가는 자리",
    isEmergency: false,
  },
  {
    id: 13,
    category: "무대",
    title: "공지 제목이 들어가는 자리",
    isEmergency: false,
  },
  {
    id: 14,
    category: "무대",
    title: "공지 제목이 들어가는 자리",
    isEmergency: false,
  },
  {
    id: 15,
    category: "무대",
    title: "공지 제목이 들어가는 자리",
    isEmergency: false,
  },
  {
    id: 16,
    category: "무대",
    title: "공지 제목이 들어가는 자리",
    isEmergency: false,
  },
];

export default function AdminNotice() {
  const navigate = useNavigate();

  const handleClearEmergency = () => {
    // TODO: 백엔드 API 연결
    console.log("모든 긴급공지 해제");
  };

  const handleNoticeClick = (noticeId: number) => {
    // 👉 공지 상세 페이지 이동
    console.log("공지 상세 이동:", noticeId);
    navigate("/AdminNoticeDetail");
  };

  const handleWriteClick = () => {
    // 👉 공지 작성 페이지 이동
    console.log("공지 작성 이동");
    navigate("/AdminNoticeWrite");
  };

  return (
    <S.Page>
      <S.TopArea>
        <S.ClearButton type="button" onClick={handleClearEmergency}>
          모든 긴급공지 해제
        </S.ClearButton>
      </S.TopArea>

      <S.NoticeList>
        {mockNotices.map((notice) => (
          <S.NoticeItem
            key={notice.id}
            type="button"
            onClick={() => handleNoticeClick(notice.id)}
          >
            <S.TextArea>
              <S.Category>{notice.category}</S.Category>
              <S.Title>{notice.title}</S.Title>
            </S.TextArea>

            <S.Chevron src={chevronRight} alt="공지 상세보기" />
          </S.NoticeItem>
        ))}
      </S.NoticeList>

      <S.BottomArea>
        <S.WriteButton type="button" onClick={handleWriteClick}>
          공지작성하기
        </S.WriteButton>
      </S.BottomArea>
    </S.Page>
  );
}
