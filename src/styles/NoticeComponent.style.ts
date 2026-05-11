import styled from "styled-components";

export const Card = styled.article`
  display: flex;
  flex: 0 0 auto;
  width: 120px;
  box-sizing: border-box;
  height: 100px;
  padding: 15px 16px;
  border: 1px solid ${({ theme }) => theme.colors.stroke.oliveLight};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.bg.neutral};
`;

export const NoticeContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 6px;

  width: 100%;
  min-width: 0;
  // padding: 15px 0;
`;

export const Category = styled.p`
  color: ${({ theme }) => theme.colors.bg.brandLight};
  font-size: 14px;
  font-weight: 500;
  margin: 0;
`;

export const CardTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.fg.primary};
  font-size: 14px;
  font-weight: 700;
  line-height: 1.5;

  overflow: hidden;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  word-break: keep-all;

  width: 100%;
  min-width: 0;
`;

export const Item = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.stroke.oliveLight};
`;

export const QuestionButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 64px;
  padding: 12px 6px;
  border: none;
  background-color: ${({ theme }) => theme.colors.bg.offWhite};
  cursor: pointer;
`;

export const QuestionText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.fg.primary};
  font-size: 16px;
  font-weight: 500;

  display: flex;
  align-items: flex-start;
  gap: 6px;
  flex: 1;
  min-width: 0;
  text-align: left;
  line-height: 1.5;
`;

export const QuestionPrefix = styled.span`
  flex-shrink: 0;
`;

export const QuestionContent = styled.span`
  flex: 1;
  min-width: 0;
  word-break: keep-all;
  white-space: pre-line;
`;

export const AnswerBox = styled.div`
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.bg.oliveLight};
`;

export const AnswerText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.bg.brand};
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  white-space: pre-line;

  padding-left: 20px;
  text-indent: -18px;
`;

// NoticeSearchResult
export const ResultRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.stroke.oliveLight};
  cursor: pointer;
`;

export const ResultText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ResultTitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.fg.primary};
  font-size: 16px;
  font-weight: 700;
`;
