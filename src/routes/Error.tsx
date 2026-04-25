import { useNavigate } from "react-router-dom";
import * as S from "../styles/Error.style";

import bubble01 from "../assets/Error/bubble01.svg";
import bubble02 from "../assets/Error/bubble02.svg";
import bubble03 from "../assets/Error/bubble03.svg";
import bubble04 from "../assets/Error/Bubble04.svg";

export default function ErrorPage() {
  const navigate = useNavigate();

  const bubbles = [
    { src: bubble01 },
    { src: bubble02 },
    { src: bubble03 },
    { src: bubble04 },
    { src: bubble03 },
    { src: bubble02 },
    { src: bubble03 },
  ];

  return (
    <S.ErrorPageContainer>
      {bubbles.map((bubble, index) => (
        <S.Bubble key={index} src={bubble.src} $index={index} alt="" />
      ))}

      <S.ContentBox>
        <S.ErrorTitle>Page Not Found</S.ErrorTitle>
        <S.ErrorCode>404</S.ErrorCode>
        <S.ErrorMessage>
          페이지를 찾을 수 없습니다.
          <br />
          존재하지 않는 주소를 입력하셨거나,
          <br />
          주소가 변경, 삭제되어 현재 찾을 수 없습니다.
        </S.ErrorMessage>
        {/* home route 등록 후 경로 수정 */}
        <S.HomeButton onClick={() => navigate("/home")}>
          홈으로 돌아가기
        </S.HomeButton>
      </S.ContentBox>
    </S.ErrorPageContainer>
  );
}
