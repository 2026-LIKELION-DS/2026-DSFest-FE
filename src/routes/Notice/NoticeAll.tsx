import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchInput from "../../components/Notice/SearchInput";
import NoticeListItem from "../../components/Notice/NoticeListItem";

import * as S from "../../styles/Notice.style";

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

  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<NoticeCategory>("전체보기");

  const trimmedKeyword = keyword.trim();

  const filteredList = noticeList.filter((item) => {
    const isCategoryMatched =
      selectedCategory === "전체보기" || item.category === selectedCategory;

    const isKeywordMatched =
      trimmedKeyword.length === 0 ||
      item.category.includes(trimmedKeyword) ||
      item.title.includes(trimmedKeyword);

    return isCategoryMatched && isKeywordMatched;
  });

  return (
    <S.NoticePage>
      <SearchInput
        value={keyword}
        onChange={setKeyword}
        placeholder="궁금한 것을 검색해 보세요"
      />

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

      {filteredList.length > 0 ? (
        <S.NoticeList>
          {filteredList.map((notice) => (
            <NoticeListItem
              key={notice.id}
              category={notice.category}
              title={notice.title}
              onClick={() => navigate(`/notice/${notice.id}`)}
            />
          ))}
        </S.NoticeList>
      ) : (
        <S.SearchEmpty>
          “{trimmedKeyword}”에 해당하는
          <br />
          공지가 없어요
        </S.SearchEmpty>
      )}
    </S.NoticePage>
  );
}
