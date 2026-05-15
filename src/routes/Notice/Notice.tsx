import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { trackEvent } from "../../utils/analytics";

import NoticeListItem from "../../components/Notice/NoticeListItem";
import FAQCard from "../../components/Notice/FAQCard";
import SearchInput from "../../components/Notice/SearchInput";
import FrequentNotice from "../../components/Notice/FrequentNotice";

import * as S from "../../styles/Notice.style";

type NoticeCategory = "EVENT" | "PERFORMANCE" | "NOTICE" | "ETC";

interface NoticeListResponse {
  id: number;
  title: string;
  category: NoticeCategory;
  urgent: boolean;
  createdAt: string;
  viewCount: number;
}

interface SearchNoticeResponse {
  results: NoticeListResponse[];
  recommended: NoticeListResponse[];
}

interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

const BASE_URL = import.meta.env.VITE_API_URL;

const CATEGORY_LABEL: Record<NoticeCategory, string> = {
  EVENT: "이벤트",
  PERFORMANCE: "공연",
  NOTICE: "안내",
  ETC: "기타",
};

const faqList = [
  {
    question: "쓰레기는 어디에 버리나요?",
    answer:
      "학내 비치된 쓰레기통 어디든 버릴 수 있습니다. 음식물 쓰레기의 경우, 영근터 구조물(별) 옆쪽에 위치한 통에 음식물만 버립니다. 대용량 물이나 기타 액체는 하수구에 버리면 됩니다.",
  },
  {
    question: "손목띠 분실 및 훼손의 경우, 어떻게 해야 하나요?",
    answer:
      "정/후문 손목띠 부스에서 신분증과 실시간 포털 확인 후, 재수령이 가능합니다.",
  },
  {
    question:
      "유학생 및 교환학생은 어떻게 손목띠를 수령할 수 있나요?\n(How can international and exchange students receive wristbands?)",
    answer:
      "총학생회 운영본부에서 외국인 등록증과 명단 확인 후 손목띠 수령이 가능합니다.\n(For international and exchange students, verification is available at the Operations Headquarters.)",
  },
  {
    question: "열정 충전소(덕우존) 입장 시간과 방법은 무엇인가요?",
    answer:
      "열정충전소(덕우존) 입장은\n13일(수): 17시 30분,\n14일(목): 17시 30분,\n15일(금): 15시 30분부터 가능합니다.\n입장 시, 손목띠+도장 확인과 실시간 포털 로그인 인증이 필요합니다.",
  },
  {
    question: "열정 충전소(덕우존) 내 규율은 무엇인가요?",
    answer:
      "덕우존 내 대포 카메라(대형 카메라) 사용과 타인을 밀치는 등 무대 관람에 방해가 되는 행위를 금지합니다.",
  },
];

export default function Notice() {
  const navigate = useNavigate();

  useEffect(() => {
    const container = document.querySelector(
      "[data-app-container]",
    ) as HTMLElement;

    if (container) {
      container.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }
  }, []);

  const [keyword, setKeyword] = useState("");
  const [frequentNotices, setFrequentNotices] = useState<NoticeListResponse[]>(
    [],
  );
  const [searchResults, setSearchResults] = useState<NoticeListResponse[]>([]);
  const [recommendedNotices, setRecommendedNotices] = useState<
    NoticeListResponse[]
  >([]);

  const trimmedKeyword = keyword.trim();
  const isSearching = trimmedKeyword.length > 0;
  const hasSearchResult = searchResults.length > 0;

  useEffect(() => {
    const fetchInitialNotices = async () => {
      try {
        const frequentResponse = await axios.get<
          ApiResponse<NoticeListResponse[]>
        >(`${BASE_URL}/api/notices/frequent`);

        setFrequentNotices(frequentResponse.data.result);
      } catch (error) {
        console.error("공지 메인 데이터 조회 실패:", error);
      }
    };

    fetchInitialNotices();
  }, []);

  useEffect(() => {
    if (!trimmedKeyword) return;

    const timerId = window.setTimeout(async () => {
      try {
        trackEvent("notice_search_used", {
          search_term: trimmedKeyword,
        });

        const response = await axios.get<ApiResponse<SearchNoticeResponse>>(
          `${BASE_URL}/api/notices/search`,
          {
            params: {
              keyword: trimmedKeyword,
            },
          },
        );

        setSearchResults(response.data.result.results);
        setRecommendedNotices(response.data.result.recommended);
      } catch (error) {
        console.error("공지 검색 실패:", error);
      }
    }, 500);

    return () => window.clearTimeout(timerId);
  }, [trimmedKeyword]);

  const handleChangeKeyword = (value: string) => {
    setKeyword(value);

    if (value.trim() === "") {
      setSearchResults([]);
      setRecommendedNotices([]);
    }
  };

  return (
    <S.NoticePage>
      <SearchInput
        value={keyword}
        onChange={handleChangeKeyword}
        placeholder="궁금한 것을 검색해 보세요"
      />

      {isSearching ? (
        hasSearchResult ? (
          <S.SearchResultList>
            {searchResults.map((notice) => (
              <NoticeListItem
                key={notice.id}
                id={notice.id}
                category={CATEGORY_LABEL[notice.category] ?? notice.category}
                title={notice.title}
                onClick={() => navigate(`/notice/${notice.id}`)}
              />
            ))}
          </S.SearchResultList>
        ) : (
          <>
            <S.SearchEmpty>
              “{trimmedKeyword}”에 해당하는
              <br />
              공지가 없어요
            </S.SearchEmpty>

            <S.SearchRecommendArea>
              <FrequentNotice noticeCards={recommendedNotices} />
            </S.SearchRecommendArea>
          </>
        )
      ) : (
        <>
          <FrequentNotice noticeCards={frequentNotices} />

          <S.FAQSection>
            <S.SectionTitle>자주 묻는 질문 (FAQ)</S.SectionTitle>

            <S.FAQList>
              {faqList.map((faq, index) => (
                <FAQCard
                  key={`${faq.question}-${index}`}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </S.FAQList>
          </S.FAQSection>
        </>
      )}
    </S.NoticePage>
  );
}
