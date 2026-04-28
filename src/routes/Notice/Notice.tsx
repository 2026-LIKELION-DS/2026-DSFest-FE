import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { trackEvent } from "../../utils/analytics";

import NoticeListItem from "../../components/Notice/NoticeListItem";
import FAQCard from "../../components/Notice/FAQCard";
import SearchInput from "../../components/Notice/SearchInput";
import FrequentNotice from "../../components/Notice/FrequentNotice";

import * as S from "../../styles/Notice.style";

const noticeCards = [
  {
    id: 1,
    category: "공연",
    title: "스탠딩존\n입장 방법",
  },
  {
    id: 2,
    category: "기타",
    title: "제휴·협찬\n소개",
  },
  {
    id: 3,
    category: "안내",
    title: "개인 규율\n안내",
  },
  {
    id: 4,
    category: "기타",
    title: "개발\n그만하는 법",
  },
];

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

  const trimmedKeyword = keyword.trim();

  const filteredNotices = useMemo(() => {
    if (!trimmedKeyword) return [];

    return noticeCards.filter((notice) => {
      const title = notice.title.replaceAll("\n", " ");

      return (
        notice.category.includes(trimmedKeyword) ||
        title.includes(trimmedKeyword)
      );
    });
  }, [trimmedKeyword]);

  useEffect(() => {
    if (!trimmedKeyword) return;

    const timerId = window.setTimeout(() => {
      trackEvent("notice_search_used", {
        search_term: trimmedKeyword,
      });
    }, 500);

    return () => window.clearTimeout(timerId);
  }, [trimmedKeyword]);

  const isSearching = trimmedKeyword.length > 0;
  const hasSearchResult = filteredNotices.length > 0;

  return (
    <S.NoticePage>
      <SearchInput
        value={keyword}
        onChange={setKeyword}
        placeholder="궁금한 것을 검색해 보세요"
      />

      {isSearching ? (
        hasSearchResult ? (
          <S.SearchResultList>
            {filteredNotices.map((notice) => (
              <NoticeListItem
                key={notice.id}
                id={notice.id}
                category={notice.category}
                title={notice.title.replaceAll("\n", " ")}
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
              <FrequentNotice noticeCards={noticeCards} />
            </S.SearchRecommendArea>
          </>
        )
      ) : (
        <>
          <FrequentNotice noticeCards={noticeCards} />

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
