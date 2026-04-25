import { useNavigate } from "react-router-dom";

import NoticeCard from "./NoticeCard";
import * as S from "../../styles/Notice.style";

import chevronRight from "../../assets/Notice/ChevronRight.svg";

interface FrequentNotice {
  category: string;
  title: string;
}

interface FrequentNoticeProps {
  noticeCards: FrequentNotice[];
}

export default function FrequentNotice({ noticeCards }: FrequentNoticeProps) {
  const navigate = useNavigate();

  return (
    <>
      <S.SectionHeader>
        <S.SectionTitle>자주 찾는 공지</S.SectionTitle>
        <S.ViewAll onClick={() => navigate("/notice/all")}>
          <p>전체보기</p>
          <img src={chevronRight} alt="Chevron Right" />
        </S.ViewAll>
      </S.SectionHeader>

      <S.ScrollWrapper>
        <S.CardScrollArea>
          {noticeCards.map((card, index) => (
            <NoticeCard
              key={`${card.category}-${card.title}-${index}`}
              category={card.category}
              title={card.title}
            />
          ))}
        </S.CardScrollArea>
      </S.ScrollWrapper>
    </>
  );
}
