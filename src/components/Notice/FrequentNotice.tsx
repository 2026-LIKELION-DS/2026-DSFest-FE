import { useNavigate } from "react-router-dom";

import NoticeCard from "./NoticeCard";
import * as S from "../../styles/Notice.style";

import chevronRight from "../../assets/Notice/ChevronRight.svg";

type NoticeCategory = "EVENT" | "PERFORMANCE" | "NOTICE" | "ETC";

const CATEGORY_LABEL: Record<NoticeCategory, string> = {
  EVENT: "이벤트",
  PERFORMANCE: "공연",
  NOTICE: "안내",
  ETC: "기타",
};

const getCategoryLabel = (category: string) => {
  return CATEGORY_LABEL[category as NoticeCategory] ?? category;
};

interface FrequentNotice {
  id: number;
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
          {noticeCards.map((card) => (
            <div
              key={card.id}
              onClick={() => navigate(`/notice/${card.id}`)}
              style={{ cursor: "pointer" }}
            >
              <NoticeCard
                category={getCategoryLabel(card.category)}
                title={card.title}
              />
            </div>
          ))}
        </S.CardScrollArea>
      </S.ScrollWrapper>
    </>
  );
}
