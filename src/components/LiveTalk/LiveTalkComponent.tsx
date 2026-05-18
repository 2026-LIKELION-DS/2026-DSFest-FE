import { useEffect, useRef, useState } from "react";
import liveTalkJson from "../../data/LiveTalkJson/Message.json";
import ChatItem from "./ChatItem";
import ChatInput from "./ChatInput";
import * as S from "../../styles/LiveTalk.style";
import { useNavigate } from "react-router-dom";
import MegaphoneIcon from "../../assets/LiveTalk/MegaphoneFill.svg";

export type ChatMessage = {
  id: number;
  text: string;
  sender: "me" | "other";
  time: string;
  dateKey: string;
  dateText: string;
  isTemp?: boolean;
};

type BannerMode = "default" | "artist" | "collapsed";

type LiveTalkApiMessage = {
  messageId: number;
  senderGuestUuid: string;
  content: string;
  createdAt: string;
};

type TopicType = "GENERAL" | "ARTIST";

type LiveTalkTopic = {
  id: number;
  title: string;
  subtitle: string;
  topicType: TopicType;
  artistId: number | null;
};

/* 
type StompClientLike = {
  connected: boolean;
  activate: () => void;
  deactivate: () => void;
  publish: (params: { destination: string; body: string }) => void;
  subscribe: (
    destination: string,
    callback: (message: { body: string }) => void
  ) => { unsubscribe: () => void };
};
*/

export default function LiveTalkComponent() {
  /* 
  const API_URL = import.meta.env.VITE_API_URL;
  */

  const [bannerMode, setBannerMode] = useState<BannerMode>("default");
  const [showBannerText, setShowBannerText] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [topic, setTopic] = useState<LiveTalkTopic | null>(null);

  /* 
  const [isLoadingPrevious, setIsLoadingPrevious] = useState(false);
  const [hasMorePreviousMessages, setHasMorePreviousMessages] =
    useState(true);
  */

  const navigate = useNavigate();

  /* 
  const stompClientRef = useRef<StompClientLike | null>(null);
  */

  const chatAreaRef = useRef<HTMLDivElement | null>(null);

  const previousBannerModeRef =
    useRef<Exclude<BannerMode, "collapsed">>("default");

  const dragStartXRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const bannerTextTimerRef = useRef<number | null>(null);
  const shouldScrollToBottomRef = useRef(true);

  /*
  const guestUuidRef = useRef(getGuestUuid());

  function getGuestUuid() {
    const savedUuid = localStorage.getItem("guest_uuid");

    if (savedUuid) return savedUuid;

    const newUuid = crypto.randomUUID();
    localStorage.setItem("guest_uuid", newUuid);

    return newUuid;
  }
  */

 

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      const chatArea = chatAreaRef.current;
      if (!chatArea) return;

      chatArea.scrollTop = chatArea.scrollHeight;
    });
  };

 

  const getValidDate = (dateString?: string) => {
    const date = dateString ? new Date(dateString) : new Date();
    return Number.isNaN(date.getTime()) ? new Date() : date;
  };

  const formatTime = (dateString?: string) => {
    const date = getValidDate(dateString);

    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDateKey = (dateString?: string) => {
    const date = getValidDate(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formatDateText = (dateString?: string) => {
    const date = getValidDate(dateString);

    return date.toLocaleDateString("ko-KR", {
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  const convertMessage = (message: LiveTalkApiMessage): ChatMessage => {
    return {
      id: message.messageId,
      text: message.content,

      
      sender: "other",

      time: formatTime(message.createdAt),
      dateKey: formatDateKey(message.createdAt),
      dateText: formatDateText(message.createdAt),
    };
  };

  const createTempMessage = (text: string): ChatMessage => {
    const now = new Date().toISOString();

    return {
      id: -Date.now(),
      text,
      sender: "me",
      time: formatTime(now),
      dateKey: formatDateKey(now),
      dateText: formatDateText(now),
      isTemp: true,
    };
  };

  /* 
  const getMessageListFromResponse = (...) => { ... };
  */

  /* 
  const fetchPreviousMessages = async () => { ... };
  */

  const handleChatAreaScroll = () => {
    const chatArea = chatAreaRef.current;
    if (!chatArea) return;

    const distanceFromBottom =
      chatArea.scrollHeight - chatArea.scrollTop - chatArea.clientHeight;

    shouldScrollToBottomRef.current = distanceFromBottom < 80;
  };

  useEffect(() => {
    const artistTopic: LiveTalkTopic = {
      id: 1,
      title: "아티스트 공연 보러가기",
      subtitle: "지금 진행 중인 공연을 확인해보세요",
      topicType: "ARTIST",
      artistId: 1,
    };

    setTopic(artistTopic);
    previousBannerModeRef.current = "artist";
    setBannerMode("artist");
  }, []);

 
  useEffect(() => {
    const messageList = liveTalkJson.messages;

    setMessages(messageList.map(convertMessage));
    shouldScrollToBottomRef.current = true;
  }, []);

  useEffect(() => {
    if (messages.length === 0) return;

    if (shouldScrollToBottomRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    return () => {
      if (bannerTextTimerRef.current) {
        window.clearTimeout(bannerTextTimerRef.current);
      }
    };
  }, []);

 
  const sendMessage = (text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    shouldScrollToBottomRef.current = true;

    setMessages((prev) => [...prev, createTempMessage(trimmedText)]);
  };

  const hideBannerText = () => {
    if (bannerTextTimerRef.current) {
      window.clearTimeout(bannerTextTimerRef.current);
    }

    setShowBannerText(false);
  };

  const showBannerTextAfterTransition = () => {
    if (bannerTextTimerRef.current) {
      window.clearTimeout(bannerTextTimerRef.current);
    }

    bannerTextTimerRef.current = window.setTimeout(() => {
      setShowBannerText(true);
    }, 220);
  };

  const handleBannerPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStartXRef.current = e.clientX;
    isDraggingRef.current = false;

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleBannerPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartXRef.current === null) return;

    const diffX = dragStartXRef.current - e.clientX;

    if (Math.abs(diffX) > 10) {
      isDraggingRef.current = true;
    }
  };

  const handleBannerPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartXRef.current === null) return;

    const diffX = dragStartXRef.current - e.clientX;

    if (diffX > 50 && bannerMode !== "collapsed") {
      previousBannerModeRef.current =
        bannerMode === "artist" ? "artist" : "default";

      hideBannerText();
      setBannerMode("collapsed");
    }

    if (
      Math.abs(diffX) <= 10 &&
      bannerMode !== "collapsed" &&
      topic?.topicType === "ARTIST"
    ) {
      navigate("/artist");
    }

    dragStartXRef.current = null;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const handleBannerClick = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      return;
    }

    if (bannerMode === "collapsed") {
      hideBannerText();
      setBannerMode(previousBannerModeRef.current);
      showBannerTextAfterTransition();
      return;
    }

    if (topic?.topicType === "ARTIST") {
      navigate("/artist");
    }
  };

  const isCollapsed = bannerMode === "collapsed";

  return (
    <S.Container>
      {topic && (
        <S.TopBanner
          $isCollapsed={isCollapsed}
          onPointerDown={handleBannerPointerDown}
          onPointerMove={handleBannerPointerMove}
          onPointerUp={handleBannerPointerUp}
          onClick={handleBannerClick}
        >
          <S.BannerIcon src={MegaphoneIcon} alt="확성기 아이콘" />

          {!isCollapsed && showBannerText && (
            <>
              <S.BannerTextBox>
                <S.BannerSubText>{topic.subtitle}</S.BannerSubText>
                <S.BannerTitle>{topic.title}</S.BannerTitle>
              </S.BannerTextBox>

              {bannerMode === "artist" && <S.BannerArrow>›</S.BannerArrow>}
            </>
          )}
        </S.TopBanner>
      )}

      <S.ChatArea
        ref={chatAreaRef}
        onScroll={handleChatAreaScroll}
        $hasBanner={!!topic}
      >
        {messages.map((message, index) => {
          const previousMessage = messages[index - 1];

          const shouldShowDate =
            !previousMessage || previousMessage.dateKey !== message.dateKey;

          return (
            <div key={message.id}>
              {shouldShowDate && <S.DateText>{message.dateText}</S.DateText>}

              <ChatItem message={message} />
            </div>
          );
        })}
      </S.ChatArea>

      <S.InputWrapper>
        <ChatInput onSend={sendMessage} />
      </S.InputWrapper>
    </S.Container>
  );
}
