import { useLocation, useNavigate, useParams } from "react-router-dom";

import * as S from "./ImageDetail.style";

interface ImageDetailState {
  initialIndex: number;
  imageCount: number;
}

interface ImageDetailParams {
  targetType?: string;
  targetId?: string;
}

export default function ImageDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { targetType, targetId } = useParams<keyof ImageDetailParams>();

  const state = location.state as ImageDetailState | null;

  const currentIndex = state?.initialIndex ?? 0;
  const imageCount = state?.imageCount ?? 1;

  // 나중에 백엔드 연동할 때 사용
  // targetType: notice, artist, event ...
  // targetId: 해당 게시글/아티스트/이벤트 id
  console.log(targetType, targetId);

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
