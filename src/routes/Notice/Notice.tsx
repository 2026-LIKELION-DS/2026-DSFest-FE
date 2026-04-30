import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { trackEvent } from "../../utils/analytics";

import NoticeListItem from "../../components/Notice/NoticeListItem";
import FAQCard from "../../components/Notice/FAQCard";
import SearchInput from "../../components/Notice/SearchInput";
import FrequentNotice from "../../components/Notice/FrequentNotice";

import * as S from "../../styles/Notice.style";

type NoticeCategory = "EVENT" | "PERFORMANCE" | "INFO" | "ETC";

interface NoticeListResponse {
  id: number;
  title: string;
  category: NoticeCategory;
  urgent: boolean;
  createdAt: string;
  viewCount: number;
}

interface UrgentNoticeResponse {
  id: number;
  title: string;
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
  INFO: "안내",
  ETC: "기타",
};

const faqList = [
  {
    question: "쓰레기는 어디에 버리나요?",
    answer:
      "쓰레기를 버리는 위치는 이곳 입니다.\n쓰레기를 버리는 위치는 이곳 입니다.",
  },
  {
    question: "쓰레기는 어디에 버리나요?",
    answer:
      "쓰레기를 버리는 위치는 이곳 입니다.\n쓰레기를 버리는 위치는 이곳 입니다.",
  },
  {
    question: "쓰레기는 어디에 버리나요?",
    answer:
      "쓰레기를 버리는 위치는 이곳 입니다.\n쓰레기를 버리는 위치는 이곳 입니다.",
  },
];

export default function Notice() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [frequentNotices, setFrequentNotices] = useState<NoticeListResponse[]>(
    [],
  );
  const [urgentNotice, setUrgentNotice] = useState<UrgentNoticeResponse | null>(
    null,
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
        const [frequentResponse, urgentResponse] = await Promise.all([
          axios.get<ApiResponse<NoticeListResponse[]>>(
            `${BASE_URL}/api/notices/frequent`,
          ),
          axios.get<ApiResponse<UrgentNoticeResponse | null>>(
            `${BASE_URL}/api/notices/urgent`,
          ),
        ]);

        setFrequentNotices(frequentResponse.data.result);
        setUrgentNotice(urgentResponse.data.result);
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
                category={CATEGORY_LABEL[notice.category]}
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
          {urgentNotice && (
            <NoticeListItem
              id={urgentNotice.id}
              category="긴급"
              title={urgentNotice.title}
              onClick={() => navigate(`/notice/${urgentNotice.id}`)}
            />
          )}

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
