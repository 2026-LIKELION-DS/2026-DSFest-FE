import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
// import axios from "axios";

import * as S from "../../styles/Notice.style";
import ImageDetailComponent from "../../components/Common/ImageDetail";

import noticeData from "../../data/NoticeJson/NoticesDetail.json";

type NoticeCategory = "EVENT" | "PERFORMANCE" | "NOTICE" | "ETC";

interface NoticeDetailData {
  id: number;
  title: string;
  category: NoticeCategory;
  urgent: boolean;
  content: string;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
  viewCount: number;
}

// interface ApiResponse<T> {
//   isSuccess: boolean;
//   code: string;
//   message: string;
//   result: T;
// }

// const BASE_URL = import.meta.env.VITE_API_URL;

export default function NoticeDetail() {
  const { id } = useParams<{ id: string }>();

  // const [notice, setNotice] = useState<NoticeDetailData | null>(null);

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    initialIndex: 0,
  });

  const notice = useMemo(() => {
    if (!id) return null;

    return (
      (noticeData as NoticeDetailData[]).find(
        (item) => item.id === Number(id),
      ) ?? null
    );
  }, [id]);

  // useEffect(() => {
  //   if (!id) return;

  //   const fetchNoticeDetail = async () => {
  //     try {
  //       const response = await axios.get<ApiResponse<NoticeDetailData>>(
  //         `${BASE_URL}/api/notices/${id}`,
  //       );

  //       setNotice(response.data.result);
  //     } catch (error) {
  //       console.error("공지 상세 조회 실패:", error);
  //     }
  //   };

  //   fetchNoticeDetail();
  // }, [id]);

  if (!notice) return null;

  const displayImages = notice.imageUrls ?? [];

  return (
    <S.NoticeDetailPage>
      <S.DetailTitle>{notice.title}</S.DetailTitle>

      {displayImages.length > 0 && (
        <S.DetailImageScroll>
          {displayImages.map((src, index) => (
            <S.DetailImageBox
              key={`${src}-${index}`}
              as="button"
              onClick={() =>
                setModalConfig({ isOpen: true, initialIndex: index })
              }
            >
              <img src={src} alt="" />
            </S.DetailImageBox>
          ))}
        </S.DetailImageScroll>
      )}

      <S.DetailContent>{notice.content}</S.DetailContent>

      <ImageDetailComponent
        isOpen={modalConfig.isOpen}
        initialIndex={modalConfig.initialIndex}
        images={displayImages}
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
      />
    </S.NoticeDetailPage>
  );
}
