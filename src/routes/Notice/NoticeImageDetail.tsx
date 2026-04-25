import { useLocation, useNavigate } from "react-router-dom";

import * as S from "../../styles/Notice.style";

interface ImageDetailState {
  initialIndex: number;
  imageCount: number;
}

export default function NoticeImageDetail() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as ImageDetailState | null;

  const currentIndex = state?.initialIndex ?? 0;
  const imageCount = state?.imageCount ?? 1;

  return (
    <S.ImageDetailPage>
      <S.ImageContent>
        <S.ImageModalCount>
          {currentIndex + 1}/{imageCount}
        </S.ImageModalCount>

        <S.ImageModalImage />

        <S.ImageModalCloseButton type="button" onClick={() => navigate(-1)}>
          닫기
        </S.ImageModalCloseButton>
      </S.ImageContent>
    </S.ImageDetailPage>
  );
}
