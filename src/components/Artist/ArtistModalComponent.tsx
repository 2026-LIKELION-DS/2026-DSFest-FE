import React, { useMemo, useState } from "react";

import ImageDetailComponent from "../../components/Common/ImageDetail";
import * as S from "../../styles/ArtistComponent.style";

import noticeData from "../../data/NoticeJson/NoticesDetail.json";

interface ArtistModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NoticeDetail {
  id: number;
  title: string;
  category: string;
  urgent: boolean;
  content: string;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
  viewCount: number;
}

// interface NoticeResponse {
//   isSuccess: boolean;
//   code: string;
//   message: string;
//   result: NoticeDetail;
// }

// const API_URL = import.meta.env.VITE_API_URL;

const NOTICE_ID = 3;

const ArtistModalComponent: React.FC<ArtistModalComponentProps> = ({
  isOpen,
  onClose,
}) => {
  // const [notice, setNotice] = useState<NoticeDetail | null>(null);

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    initialIndex: 0,
  });

  const notice = useMemo(() => {
    return (
      (noticeData as NoticeDetail[]).find((item) => item.id === NOTICE_ID) ??
      null
    );
  }, []);

  // useEffect(() => {
  //   if (!isOpen) return;

  //   const fetchNotice = async () => {
  //     try {
  //       const response = await fetch(`${API_URL}/api/notices/${NOTICE_ID}`);
  //       const data: NoticeResponse = await response.json();

  //       if (!response.ok || !data.isSuccess) {
  //         alert(data.message || "공지사항을 불러오지 못했습니다.");
  //         return;
  //       }

  //       setNotice(data.result);
  //     } catch (error) {
  //       console.error(error);
  //       alert("공지사항 조회 중 오류가 발생했습니다.");
  //     }
  //   };

  //   fetchNotice();
  // }, [API_URL, isOpen]);

  if (!isOpen) return null;

  const displayImages = notice?.imageUrls ?? [];

  return (
    <>
      <S.ArtistModalOverlay onClick={onClose}>
        <S.ArtistModalContainer onClick={(e) => e.stopPropagation()}>
          <S.ArtistContentArea>
            <S.ArtistModalTitle>
              {notice?.title || "무대 입장 방법 관련 안내"}
            </S.ArtistModalTitle>

            <S.ArtistModalDivider />

            {displayImages.length > 0 && (
              <S.ArtistImageRow>
                {displayImages.map((src, idx) => (
                  <S.ModalImage
                    key={`${src}-${idx}`}
                    src={src}
                    alt={`안내 이미지 ${idx + 1}`}
                    onClick={() =>
                      setModalConfig({
                        isOpen: true,
                        initialIndex: idx,
                      })
                    }
                  />
                ))}
              </S.ArtistImageRow>
            )}

            <S.ArtistDescription>
              {notice?.content || "공지 내용을 불러오는 중입니다."}
            </S.ArtistDescription>
          </S.ArtistContentArea>

          <S.ArtistButtonGroup>
            <S.ArtistCloseButton onClick={onClose}>닫기</S.ArtistCloseButton>
          </S.ArtistButtonGroup>
        </S.ArtistModalContainer>
      </S.ArtistModalOverlay>

      <ImageDetailComponent
        isOpen={modalConfig.isOpen}
        initialIndex={modalConfig.initialIndex}
        images={displayImages}
        onClose={() =>
          setModalConfig((prev) => ({
            ...prev,
            isOpen: false,
          }))
        }
      />
    </>
  );
};

export default ArtistModalComponent;
