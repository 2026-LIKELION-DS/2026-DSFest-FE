import { useState } from "react";
import * as S from "../../styles/ChatInput.style";
import SendIcon from "../../assets/LiveTalk/Send.svg";

interface Props {
  onSend: (text: string) => void;
}

export default function ChatInput({ onSend }: Props) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
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
