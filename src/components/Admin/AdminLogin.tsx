import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../../styles/AdminLogin.styles";
import { saveAdminToken } from "../../utils/Admin";

export default function AdminLogin() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        alert("아이디 또는 비밀번호가 올바르지 않습니다.");
        return;
      }

      const accessToken = data.result.accessToken;

      saveAdminToken(accessToken);

      navigate("/AdminNotice");
    } catch (error) {
      console.error(error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <S.Container>
      <S.Title>축제 관계자 페이지</S.Title>

      <S.Label>아이디</S.Label>
      <S.Input
        placeholder="아이디를 입력해 주세요"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <S.Label>비밀번호</S.Label>
      <S.Input
        type="password"
        placeholder="비밀번호를 입력해 주세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <S.Button onClick={handleLogin}>로그인</S.Button>
    </S.Container>
  );
}
