import { useNavigate } from "react-router-dom";

import NoticeCard from "../../components/Notice/NoticeCard";
import FAQCard from "../../components/Notice/FAQCard";
import * as S from "../../styles/Notice.style";

import search from "../../assets/Notice/Search.svg";
import chevronRight from "../../assets/Notice/ChevronRight.svg";

const noticeCards = [
  {
    category: "공연",
    title: "스탠딩존\n입장 방법",
  },
  {
    category: "기타",
    title: "제휴·협찬\n소개",
  },
  {
    category: "안내",
    title: "개인 규율\n안내",
  },
  {
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

  return (
    <S.NoticePage>
      <S.SearchSection>
        <S.SearchBox>
          <img src={search} alt="Search" />
          <S.SearchInput placeholder="궁금한 것을 검색해 보세요" />
        </S.SearchBox>
      </S.SearchSection>

      <S.SectionHeader>
        <S.SectionTitle>자주 찾는 공지</S.SectionTitle>
        <S.ViewAll onClick={() => navigate("/notice/all")}>
          <p>전체보기</p>
          <img src={chevronRight} alt="Chevron Right" />
        </S.ViewAll>
      </S.SectionHeader>

      <S.ScrollWrapper>
        <S.CardScrollArea>
          {noticeCards.map((card) => (
            <NoticeCard
              key={card.category}
              category={card.category}
              title={card.title}
            />
          ))}
        </S.CardScrollArea>
      </S.ScrollWrapper>

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
    </S.NoticePage>
  );
}
