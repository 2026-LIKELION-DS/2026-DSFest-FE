import { useEffect, useRef, useState } from "react";
import ChatList from "./ChatList";
import ChatInput from "./ChatInput";
import * as S from "../../styles/LiveTalk.style";

import MegaphoneIcon from "../../assets/LiveTalk/MegaphoneFill.svg";

export type ChatMessage = {
  id: number;
  text: string;
  sender: "me" | "other";
  time: string;
};

type BannerMode = "default" | "artist" | "collapsed";

export default function LiveTalkComponent() {
  const [bannerMode, setBannerMode] = useState<BannerMode>("default");
  const [showBannerText, setShowBannerText] = useState(true);

  const previousBannerModeRef =
    useRef<Exclude<BannerMode, "collapsed">>("default");

  const chatAreaRef = useRef<HTMLDivElement | null>(null);
  const dragStartXRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const bannerTextTimerRef = useRef<number | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "상대가 보낸 텍스트가 들어가는 자리상대가 보낸 텍스트가 들어가는 자리",
      sender: "other",
      time: "11:13",
    },
    {
      id: 2,
      text: "내가 보낸 텍스트",
      sender: "me",
      time: "11:13",
    },
    {
      id: 3,
      text: "내가 보낸 텍스트 내가 보낸 텍스트 내가 보낸 텍스트",
      sender: "me",
      time: "11:13",
    },
    {
      id: 4,
      text: "상대가 보낸 텍스트가 들어가는 자리",
      sender: "other",
      time: "11:13",
    },
  ]);

  useEffect(() => {
    const chatArea = chatAreaRef.current;
    if (!chatArea) return;

    chatArea.scrollTop = chatArea.scrollHeight;
  }, [messages]);

  useEffect(() => {
    return () => {
      if (bannerTextTimerRef.current) {
        window.clearTimeout(bannerTextTimerRef.current);
      }
    };
  }, []);

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

  const sendMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: Date.now(),
      text,
      sender: "me",
      time: "11:30",
    };

    setMessages((prev) => [...prev, newMessage]);
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

    dragStartXRef.current = null;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // pointer capture가 이미 해제된 경우 무시
    }
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
    }
  };

  const isCollapsed = bannerMode === "collapsed";

  return (
    <S.Container>
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
              <S.BannerSubText>
                {bannerMode === "artist"
                  ? "지금 공연 중인 아티스트 정보 보러 가기"
                  : "지금은 낮 부스시간!"}
              </S.BannerSubText>

              <S.BannerTitle>
                {bannerMode === "artist"
                  ? "함께 무대를 감상해요!"
                  : "부스들은 어떠셨나요?"}
              </S.BannerTitle>
            </S.BannerTextBox>

            {bannerMode === "artist" && <S.BannerArrow>›</S.BannerArrow>}
          </>
        )}
      </S.TopBanner>

      <S.ChatArea ref={chatAreaRef}>
        <S.DateText>5월 13일 수요일</S.DateText>
        <ChatList messages={messages} />
      </S.ChatArea>

      <S.InputWrapper>
        <ChatInput onSend={sendMessage} />
      </S.InputWrapper>
    </S.Container>
  );
}
