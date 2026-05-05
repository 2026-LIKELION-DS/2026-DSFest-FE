// src/components/LiveTalk/LiveTalkComponent.tsx

import { useEffect, useRef, useState } from "react";

import ChatItem from "./ChatItem";
import ChatInput from "./ChatInput";
import * as S from "../../styles/LiveTalk.style";

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

export default function LiveTalkComponent() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [bannerMode, setBannerMode] = useState<BannerMode>("default");
  const [showBannerText, setShowBannerText] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [topic, setTopic] = useState<LiveTalkTopic | null>(null);
  const [isLoadingPrevious, setIsLoadingPrevious] = useState(false);
  const [hasMorePreviousMessages, setHasMorePreviousMessages] = useState(true);

  const stompClientRef = useRef<any>(null);
  const chatAreaRef = useRef<HTMLDivElement | null>(null);
  const previousBannerModeRef =
    useRef<Exclude<BannerMode, "collapsed">>("default");

  const dragStartXRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const bannerTextTimerRef = useRef<number | null>(null);

  const guestUuidRef = useRef(getGuestUuid());

  function getGuestUuid() {
    const savedUuid = localStorage.getItem("guest_uuid");

    if (savedUuid) return savedUuid;

    const newUuid = crypto.randomUUID();
    localStorage.setItem("guest_uuid", newUuid);

    return newUuid;
  }

  const getApiUrl = (path: string) => {
    return `${API_URL.replace(/\/$/, "")}${path}`;
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
      sender: message.senderGuestUuid === guestUuidRef.current ? "me" : "other",
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

  const getMessageListFromResponse = (data: any): LiveTalkApiMessage[] => {
    return Array.isArray(data)
      ? data
      : data.result ?? data.messages ?? data.data ?? data.content ?? [];
  };

  const fetchPreviousMessages = async () => {
    if (
      isLoadingPrevious ||
      !hasMorePreviousMessages ||
      messages.length === 0
    ) {
      return;
    }

    const firstRealMessage = messages.find((message) => !message.isTemp);
    if (!firstRealMessage) return;

    const chatArea = chatAreaRef.current;
    const previousScrollHeight = chatArea?.scrollHeight ?? 0;

    try {
      setIsLoadingPrevious(true);

      const response = await fetch(
        getApiUrl(
          `/api/livetalk/messages/before?messageId=${firstRealMessage.id}`
        )
      );

      if (!response.ok) {
        throw new Error("이전 메시지 목록을 불러오지 못했습니다.");
      }

      const data = await response.json();
      const messageList = getMessageListFromResponse(data);

      if (messageList.length === 0) {
        setHasMorePreviousMessages(false);
        return;
      }

      const previousMessages = messageList.map(convertMessage);

      setMessages((prev) => {
        const existingIds = new Set(prev.map((message) => message.id));
        const filteredPreviousMessages = previousMessages.filter(
          (message) => !existingIds.has(message.id)
        );

        return [...filteredPreviousMessages, ...prev];
      });

      requestAnimationFrame(() => {
        const currentChatArea = chatAreaRef.current;
        if (!currentChatArea) return;

        const nextScrollHeight = currentChatArea.scrollHeight;
        currentChatArea.scrollTop = nextScrollHeight - previousScrollHeight;
      });
    } catch (error) {
      console.error("이전 메시지 로딩 실패:", error);
    } finally {
      setIsLoadingPrevious(false);
    }
  };

  const handleChatAreaScroll = () => {
    const chatArea = chatAreaRef.current;
    if (!chatArea) return;

    if (chatArea.scrollTop <= 20) {
      fetchPreviousMessages();
    }
  };

  useEffect(() => {
    const fetchCurrentTopic = async () => {
      try {
        const response = await fetch(
          getApiUrl("/api/livetalk/topics/current"),
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`대화 주제 조회 실패: ${response.status}`);
        }

        const data: TopicResponse = await response.json();

        if (!data.isSuccess || !data.result) {
          console.warn("현재 시간에 진행 중인 대화 주제가 없습니다.");
          setTopic(null);
          previousBannerModeRef.current = "default";
          setBannerMode((prev) =>
            prev === "collapsed" ? "collapsed" : "default"
          );
          return;
        }

        const currentTopic = data.result;
        setTopic(currentTopic);

        const nextBannerMode: Exclude<BannerMode, "collapsed"> =
          currentTopic.topicType === "ARTIST" ? "artist" : "default";

        previousBannerModeRef.current = nextBannerMode;

        setBannerMode((prev) => {
          if (prev === "collapsed") return "collapsed";
          return nextBannerMode;
        });
      } catch (error) {
        console.error("대화 주제 API 연동 실패:", error);
      }
    };

    fetchCurrentTopic();
  }, [API_URL]);

  useEffect(() => {
    const fetchInitialMessages = async () => {
      try {
        const response = await fetch(getApiUrl("/api/livetalk/messages"));

        if (!response.ok) {
          throw new Error("초기 채팅 목록을 불러오지 못했습니다.");
        }

        const data = await response.json();
        const messageList = getMessageListFromResponse(data);

        setMessages(messageList.map(convertMessage));
      } catch (error) {
        console.error("초기 채팅 로딩 실패:", error);
      }
    };

    fetchInitialMessages();
  }, [API_URL]);

  useEffect(() => {
    let client: any = null;
    let isUnmounted = false;

    const connectWebSocket = async () => {
      try {
        const stompModule = await import("@stomp/stompjs");
        const sockJsModule = await import("sockjs-client");

        if (isUnmounted) return;

        const { Client } = stompModule;
        const SockJS = sockJsModule.default;

        client = new Client({
          webSocketFactory: () => new SockJS(getApiUrl("/ws")),
          reconnectDelay: 5000,

          onConnect: () => {
            console.log("🔥 WebSocket 연결 성공");

            client.subscribe("/topic/livetalk", (message: { body: string }) => {
              const receivedMessage: LiveTalkApiMessage = JSON.parse(
                message.body
              );

              const convertedMessage = convertMessage(receivedMessage);

              setMessages((prev) => {
                if (prev.some((msg) => msg.id === convertedMessage.id)) {
                  return prev;
                }

                if (convertedMessage.sender === "me") {
                  const tempIndex = prev.findIndex(
                    (msg) =>
                      msg.isTemp &&
                      msg.sender === "me" &&
                      msg.text === convertedMessage.text
                  );

                  if (tempIndex !== -1) {
                    const nextMessages = [...prev];
                    nextMessages[tempIndex] = convertedMessage;
                    return nextMessages;
                  }
                }

                return [...prev, convertedMessage];
              });
            });
          },

          onWebSocketError: (error: Event) => {
            console.error("❌ WebSocket 에러:", error);
          },

          onWebSocketClose: () => {
            console.log("❗ WebSocket 닫힘");
          },

          onStompError: (frame: unknown) => {
            console.error("STOMP 에러:", frame);
          },
        });

        client.activate();
        stompClientRef.current = client;
      } catch (error) {
        console.error("WebSocket 모듈 로딩 실패:", error);
      }
    };

    connectWebSocket();

    return () => {
      isUnmounted = true;

      if (client) {
        client.deactivate();
      }

      stompClientRef.current = null;
    };
  }, [API_URL]);

  useEffect(() => {
    const chatArea = chatAreaRef.current;
    if (!chatArea) return;

    chatArea.scrollTop = chatArea.scrollHeight;
  }, []);

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

    const client = stompClientRef.current;

    if (!client || !client.connected) {
      console.error("WebSocket이 아직 연결되지 않았습니다.");
      return;
    }

    setMessages((prev) => [...prev, createTempMessage(trimmedText)]);

    client.publish({
      destination: "/app/livetalk.send",
      body: JSON.stringify({
        guestUuid: guestUuidRef.current,
        content: trimmedText,
      }),
    });

    requestAnimationFrame(() => {
      const chatArea = chatAreaRef.current;
      if (!chatArea) return;
      chatArea.scrollTop = chatArea.scrollHeight;
    });
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
                {topic?.subtitle ?? "현재 진행 중인 대화 주제가 없습니다."}
              </S.BannerSubText>

              <S.BannerTitle>{topic?.title ?? "라이브톡"}</S.BannerTitle>
            </S.BannerTextBox>

            {bannerMode === "artist" && <S.BannerArrow>›</S.BannerArrow>}
          </>
        )}
      </S.TopBanner>

      <S.ChatArea ref={chatAreaRef} onScroll={handleChatAreaScroll}>
        {isLoadingPrevious && (
          <S.DateText>이전 메시지 불러오는 중...</S.DateText>
        )}

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
