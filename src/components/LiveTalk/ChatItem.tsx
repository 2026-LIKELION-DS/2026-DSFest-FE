import type { ChatMessage } from "./LiveTalkComponent";
import * as S from "../../styles/Chat.style";

export default function ChatItem({ message }: { message: ChatMessage }) {
  const isMine = message.sender === "me";

  return (
    <S.Row $isMine={isMine}>
      <S.MessageWrapper>
        {isMine && <S.Time>{message.time}</S.Time>}

        <S.Bubble $isMine={isMine}>{message.text}</S.Bubble>

        {!isMine && <S.Time>{message.time}</S.Time>}
      </S.MessageWrapper>
    </S.Row>
  );
}
 