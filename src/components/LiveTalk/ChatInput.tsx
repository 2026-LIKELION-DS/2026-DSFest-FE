import { useState } from "react";
import * as S from "../../styles/ChatInput.style";
import SendIcon from "../../assets/LiveTalk/Send.svg";

interface Props {
  onSend: (text: string) => void;
}

const MAX_LENGTH = 200;

export default function ChatInput({ onSend }: Props) {
  const [text, setText] = useState("");

  const isOverLimit = text.length > MAX_LENGTH;

  const handleSend = () => {
    const trimmedText = text.trim();

    if (!trimmedText) return;

    if (trimmedText.length > MAX_LENGTH) {
      alert("입력할 수 있는 최대 글자수는 200자 입니다.");
      return;
    }

    onSend(trimmedText);
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <S.Container>
      <S.InputBox>
        <S.Input
          value={text}
          $isOverLimit={isOverLimit}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="대화를 나눠보세요"
        />
      </S.InputBox>

      <S.SendButton type="button" onClick={handleSend}>
        <img src={SendIcon} width={24} height={24} alt="전송" />
      </S.SendButton>
    </S.Container>
  );
}