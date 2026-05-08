import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { trackEvent } from "../../utils/analytics";

import SearchInput from "../../components/Notice/SearchInput";
import NoticeListItem from "../../components/Notice/NoticeListItem";
import FrequentNotice from "../../components/Notice/FrequentNotice";

import * as S from "../../styles/Notice.style";

type NoticeCategory = "EVENT" | "PERFORMANCE" | "NOTICE" | "ETC";
type CategoryFilter = "ALL" | NoticeCategory;

interface NoticeItem {
  id: number;
  title: string;
  category: NoticeCategory;
  urgent: boolean;
  createdAt: string;
  viewCount: number;
}

interface SearchNoticeResponse {
  results: NoticeItem[];
  recommended: NoticeItem[];
}

interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

interface CategoryOption {
  label: string;
  value: CategoryFilter;
}

const BASE_URL = import.meta.env.VITE_API_URL;

const categories: CategoryOption[] = [
  { label: "전체보기", value: "ALL" },
  { label: "공연", value: "PERFORMANCE" },
  { label: "이벤트", value: "EVENT" },
  { label: "안내", value: "NOTICE" },
  { label: "기타", value: "ETC" },
];

const CATEGORY_LABEL: Record<NoticeCategory, string> = {
  EVENT: "이벤트",
  PERFORMANCE: "공연",
  NOTICE: "안내",
  ETC: "기타",
};

export default function NoticeAll() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("ALL");
  const [noticeList, setNoticeList] = useState<NoticeItem[]>([]);
  const [recommendedNotices, setRecommendedNotices] = useState<NoticeItem[]>(
    [],
  );

  const trimmedKeyword = keyword.trim();
  const isSearching = trimmedKeyword.length > 0;
  const hasNoticeList = noticeList.length > 0;

  useEffect(() => {
    const fetchNoticeList = async () => {
      try {
        if (trimmedKeyword) {
          const response = await axios.get<ApiResponse<SearchNoticeResponse>>(
            `${BASE_URL}/api/notices/search`,
            {
              params: {
                keyword: trimmedKeyword,
              },
            },
          );

          setNoticeList(response.data.result.results);
          setRecommendedNotices(response.data.result.recommended);
          return;
        }

        setRecommendedNotices([]);

        if (selectedCategory === "ALL") {
          const response = await axios.get<ApiResponse<NoticeItem[]>>(
            `${BASE_URL}/api/notices`,
          );

          setNoticeList(response.data.result);
          return;
        }

        const response = await axios.get<ApiResponse<NoticeItem[]>>(
          `${BASE_URL}/api/notices/category`,
          {
            params: {
              category: selectedCategory,
            },
          },
        );

        setNoticeList(response.data.result);
      } catch (error) {
        console.error("공지 목록 조회 실패:", error);
      }
    };

    fetchNoticeList();
  }, [trimmedKeyword, selectedCategory]);

  const handleChangeKeyword = (value: string) => {
    setKeyword(value);
  };

  const handleClickCategory = (category: CategoryFilter) => {
    trackEvent("notice_category_filter", {
      category_name: category,
    });

    setSelectedCategory(category);
  };

  return (
    <S.NoticePage>
      <SearchInput
        value={keyword}
        onChange={handleChangeKeyword}
        placeholder="궁금한 것을 검색해 보세요"
      />

      <S.CategoryList>
        {categories.map((category) => (
          <S.CategoryButton
            key={category.value}
            type="button"
            $isActive={selectedCategory === category.value}
            onClick={() => handleClickCategory(category.value)}
          >
            {category.label}
          </S.CategoryButton>
        ))}
      </S.CategoryList>

      {hasNoticeList ? (
        <S.NoticeList>
          {noticeList.map((notice) => (
            <NoticeListItem
              key={notice.id}
              id={notice.id}
              category={CATEGORY_LABEL[notice.category]}
              title={notice.title}
              onClick={() => navigate(`/notice/${notice.id}`)}
            />
          ))}
        </S.NoticeList>
      ) : (
        <>
          <S.SearchEmpty>
            {isSearching ? `“${trimmedKeyword}”에 해당하는` : "해당 카테고리에"}
            <br />
            공지가 없어요
          </S.SearchEmpty>

          {isSearching && recommendedNotices.length > 0 && (
            <S.SearchRecommendArea>
              <FrequentNotice noticeCards={recommendedNotices} />
            </S.SearchRecommendArea>
          )}
        </>
      )}
    </S.NoticePage>
  );
}
