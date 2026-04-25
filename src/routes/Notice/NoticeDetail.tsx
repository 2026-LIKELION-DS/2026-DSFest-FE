import { useParams, useNavigate } from "react-router-dom";
import * as S from "../../styles/Notice.style";

interface NoticeDetailData {
  id: number;
  title: string;
  content: string;
  imageCount: number;
}

const noticeDetailList: NoticeDetailData[] = [
  {
    id: 1,
    title: "공지 제목 공지 제목공지 제목공지 제목공지 제목",
    content:
      "공지 본문이 들어가는 자리입니다. 공지 텍스트가 들어가고 이렇게 공지 본문이 들어가는 자리입니다. 공지 텍스트가 들어가고 이렇게공지 본문이 들어가는 자리입니다. 공지 텍스트가 들어가고 이렇게\n\n공지 본문이 들어가는 자리입니다. 공지 텍스트가 들어가고 이렇게\n\n공지 본문이 들어가는 자리입니다. 공지 텍스트가 들어가고 이렇게공지 본문이 들어가는 자리입니다. 공지 텍스트가 들어가고 이렇게",
    imageCount: 3,
  },
  {
    id: 2,
    title: "이벤트 공지 제목이 들어가는 자리",
    content:
      "이벤트 관련 공지 본문이 들어가는 자리입니다.\n\n공지 텍스트가 들어가고 이렇게 보여집니다.",
    imageCount: 2,
  },
  {
    id: 3,
    title: "안내 공지 제목이 들어가는 자리",
    content:
      "안내 공지 본문이 들어가는 자리입니다.\n\n공지 텍스트가 들어가고 이렇게 보여집니다.",
    imageCount: 1,
  },
];

export default function NoticeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const notice = noticeDetailList.find((item) => item.id === Number(id));

  if (!notice) {
    return (
      <S.NoticeDetailPage>
        <S.DetailTitle>존재하지 않는 공지입니다.</S.DetailTitle>
      </S.NoticeDetailPage>
    );
  }

  const images = Array.from({ length: notice.imageCount });

  return (
    <S.NoticeDetailPage>
      <S.DetailTitle>{notice.title}</S.DetailTitle>

      <S.DetailImageScroll>
        {images.map((_, index) => (
          <S.DetailImageBox
            key={index}
            type="button"
            aria-label={`${index + 1}번째 공지 이미지 크게 보기`}
            onClick={() =>
              navigate(`/notice/${notice.id}/image`, {
                state: {
                  initialIndex: index,
                  imageCount: notice.imageCount,
                },
              })
            }
          />
        ))}
      </S.DetailImageScroll>

      <S.DetailContent>{notice.content}</S.DetailContent>
    </S.NoticeDetailPage>
  );
}
