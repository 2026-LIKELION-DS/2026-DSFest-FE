import ChatItem from "./ChatItem";
import type { ChatMessage } from "./LiveTalkComponent";

interface Props {
  messages: ChatMessage[];
}

export default function ChatList({ messages }: Props) {
  return (
    <>
      {messages.map((msg) => (
        <ChatItem key={msg.id} message={msg} />
      ))}
    </>
  );
}
 