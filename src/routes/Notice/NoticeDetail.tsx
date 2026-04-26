import { useState } from "react";
import { useParams } from "react-router-dom";
import * as S from "../../styles/Notice.style";
import ImageDetailComponent from "../../components/Common/ImageDetail"; // 경로 확인 필요
import examplePhoto from "../../assets/hahyunsang_sample.svg";

interface NoticeDetailData {
  id: number;
  title: string;
  content: string;
  imageCount: number;
  images?: string[];
}

const noticeDetailList: NoticeDetailData[] = [
  {
    id: 1,
    title: "공지 제목 공지 제목공지 제목공지 제목공지 제목",
    content:
      "공지 본문이 들어가는 자리입니다. 공지 텍스트가 들어가고 이렇게 공지 본문이 들어가는 자리입니다. 공지 텍스트가 들어가고 이렇게공지 본문이 들어가는 자리입니다. 공지 텍스트가 들어가고 이렇게\n\n공지 본문이 들어가는 자리입니다. 공지 텍스트가 들어가고 이렇게\n\n공지 본문이 들어가는 자리입니다. 공지 텍스트가 들어가고 이렇게공지 본문이 들어가는 자리입니다. 공지 텍스트가 들어가고 이렇게",
    imageCount: 3,
    images: [examplePhoto, examplePhoto, examplePhoto],
  },
  // ... 생략
];

export default function NoticeDetail() {
  const { id } = useParams<{ id: string }>();

  // 모달 제어 상태
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    initialIndex: 0,
  });

  const notice = noticeDetailList.find((item) => item.id === Number(id));

  if (!notice) return null;

  const displayImages =
    notice.images || Array(notice.imageCount).fill(examplePhoto);

  return (
    <S.NoticeDetailPage>
      <S.DetailTitle>{notice.title}</S.DetailTitle>

      <S.DetailImageScroll>
        {displayImages.map((src, index) => (
          <S.DetailImageBox
            key={index}
            as="button" // 버튼 스타일로 활용
            onClick={() =>
              setModalConfig({ isOpen: true, initialIndex: index })
            }
          >
            <img
              src={src}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </S.DetailImageBox>
        ))}
      </S.DetailImageScroll>

      <S.DetailContent>{notice.content}</S.DetailContent>

      {/* 모달 컴포넌트 호출 */}
      <ImageDetailComponent
        isOpen={modalConfig.isOpen}
        initialIndex={modalConfig.initialIndex}
        images={displayImages}
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
      />
    </S.NoticeDetailPage>
  );
}
