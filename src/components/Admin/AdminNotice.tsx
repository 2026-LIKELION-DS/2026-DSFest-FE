import * as S from "../../styles/AdminNotice.styles";
import chevronRight from "../../assets/Admin/ChevronRight.svg";

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
    id: 5,
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
    id: 5,
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
    id: 5,
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
    id: 5,
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
    id: 5,
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
    id: 5,
    category: "무대",
    title: "공지 제목이 들어가는 자리",
    isEmergency: false,
  },
];

export default function AdminNotice() {
  const handleClearEmergency = () => {
    // TODO: 백엔드 API 연결 후 긴급공지 전체 해제 처리
    console.log("모든 긴급공지 해제");
  };

  const handleNoticeClick = (noticeId: number) => {
    // TODO: 공지 상세 페이지 이동
    console.log("공지 상세 이동:", noticeId);
  };

  const handleWriteClick = () => {
    // TODO: 공지 작성 페이지 이동
    console.log("공지 작성 이동");
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
