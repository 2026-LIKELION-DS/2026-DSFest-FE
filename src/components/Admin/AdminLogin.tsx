import * as S from "../../styles/AdminLogin.styles";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/AdminNotice");
  };

  return (
    <S.Container>
      <S.Title>축제 관계자 페이지</S.Title>

      <S.Label>아이디</S.Label>
      <S.Input placeholder="아이디를 입력해 주세요" />

      <S.Label>비밀번호</S.Label>
      <S.Input type="password" placeholder="비밀번호를 입력해 주세요" />

      <S.Button onClick={handleLogin}>로그인</S.Button>
    </S.Container>
  );
}
