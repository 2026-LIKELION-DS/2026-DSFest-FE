import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../../styles/Notice.style";

import searchIcon from "../../assets/Notice/Search.svg";
import chevronRight from "../../assets/Notice/ChevronRight_black.svg";

type NoticeCategory = "전체보기" | "공연" | "이벤트" | "안내" | "기타";

interface NoticeItem {
  id: number;
  category: NoticeCategory;
  title: string;
}

const categories: NoticeCategory[] = [
  "전체보기",
  "공연",
  "이벤트",
  "안내",
  "기타",
];

const noticeList: NoticeItem[] = [
  { id: 1, category: "공연", title: "공지 제목이 들어가는 자리" },
  { id: 2, category: "이벤트", title: "공지 제목이 들어가는 자리" },
  { id: 3, category: "안내", title: "공지 제목이 들어가는 자리" },
  { id: 4, category: "기타", title: "공지 제목이 들어가는 자리" },
  { id: 5, category: "공연", title: "공지 제목이 들어가는 자리" },
];

export default function NoticeAll() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] =
    useState<NoticeCategory>("전체보기");

  const filteredList =
    selectedCategory === "전체보기"
      ? noticeList
      : noticeList.filter((item) => item.category === selectedCategory);

  return (
    <S.NoticePage>
      <S.SearchSection>
        <S.SearchBox>
          <S.SearchIcon src={searchIcon} alt="" />
          <S.SearchInput placeholder="궁금한 것을 검색해 보세요" />
        </S.SearchBox>
      </S.SearchSection>

      <S.CategoryList>
        {categories.map((category) => (
          <S.CategoryButton
            key={category}
            type="button"
            $isActive={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </S.CategoryButton>
        ))}
      </S.CategoryList>

      <S.NoticeList>
        {filteredList.map((notice) => (
          <S.NoticeItem
            key={notice.id}
            onClick={() => navigate(`/notice/${notice.id}`)}
          >
            <S.NoticeTextBox>
              <S.NoticeCategory>{notice.category}</S.NoticeCategory>
              <S.NoticeTitle>{notice.title}</S.NoticeTitle>
            </S.NoticeTextBox>

            <img src={chevronRight} alt="상세보기" />
          </S.NoticeItem>
        ))}
      </S.NoticeList>
    </S.NoticePage>
  );
}
