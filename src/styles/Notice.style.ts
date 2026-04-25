import styled from "styled-components";

// Notice
export const NoticePage = styled.main`
  margin: 0 auto;
  padding: 16px 24px 24px;
  background: #fff;
  overflow-x: hidden;
`;

export const SearchSection = styled.section`
  display: flex;
  justify-content: center;
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  width: 354px;
  padding: 12px 16px;
  border: 1px solid #9e9e9e;
  border-radius: 100px;

  &:hover {
    border: 1px solid #161716;
  }

  &:hover input::placeholder {
    color: #161716;
  }
`;

export const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  color: #161716;
  font-size: 12px;
  font-weight: 500;

  &::placeholder {
    color: #9e9e9e;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  background-color: #ffffff;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: #161716;
  font-size: 20px;
  font-weight: 700;
`;

export const ViewAll = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  border: none;
  background: none;
  color: #9e9e9e;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
`;

export const ScrollWrapper = styled.div`
  margin-left: -24px;
  width: calc(100% + 48px);
  background-color: #f5f7ed;
`;

export const CardScrollArea = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 24px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FAQSection = styled.section`
  padding: 24px 0 0;
`;

export const FAQList = styled.div`
  margin-top: 28px;
`;

// NoticeSearchResult
export const SearchResultList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

export const SearchEmpty = styled.div`
  margin-top: 48px;
  text-align: center;
  color: #9e9e9e;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.5;
`;

export const SearchRecommendArea = styled.div`
  margin-top: 64px;
`;

// NoticeAll
export const CategoryList = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 24px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CategoryButton = styled.button<{ $isActive: boolean }>`
  flex: 0 0 auto;
  padding: 4px 12px;
  height: 32px;
  border: 1px solid ${({ $isActive }) => ($isActive ? "#0B4112" : "#9E9E9E")};
  border-radius: 100px;
  background-color: ${({ $isActive }) => ($isActive ? "#0B4112" : "#ffffff")};
  color: ${({ $isActive }) => ($isActive ? "#F2F2F2" : "#161716")};
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;

export const NoticeList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 24px 0 0;
  padding: 0;
  list-style: none;
`;

export const NoticeItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #e5ebcf;
`;

export const NoticeTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const NoticeCategory = styled.p`
  margin: 0;
  color: #277b31;
  font-size: 16px;
  font-weight: 700;
`;

export const NoticeTitle = styled.h2`
  margin: 0;
  color: #000;
  font-size: 16px;
  font-weight: 700;
`;

// NoticeDetail
export const NoticeDetailPage = styled.main`
  width: 100%;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: #ffffff;
`;

export const DetailTitle = styled.h2`
  margin: 0;
  padding: 0 24px;
  color: #000;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.5;
`;

export const DetailImageScroll = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 0 24px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const DetailImageBox = styled.button`
  flex: 0 0 auto;
  height: 180px;
  width: 144px;
  border-radius: 4px;
  background-color: #d9d9d9;
`;

export const DetailContent = styled.p`
  margin: 0;
  padding: 0 24px;
  color: #000;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  white-space: pre-line;
`;
