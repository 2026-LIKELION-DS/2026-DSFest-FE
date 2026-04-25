import styled from "styled-components";

export const Card = styled.article`
  display: flex;
  flex: 0 0 auto;
  width: 120px;
  box-sizing: border-box;
  height: 100px;
  padding: 0 16px;
  border: 1px solid #e5ebcf;
  border-radius: 4px;
  background-color: #fffefb;
`;

export const NoticeContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
`;

export const Category = styled.p`
  color: #277b31;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
`;

export const CardTitle = styled.h3`
  margin: 0;
  color: #161716;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.5;
  white-space: pre-line;
`;

export const Item = styled.div`
  border-bottom: 1px solid #e5ebcf;
`;

export const QuestionButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 64px;
  padding: 0 20px;
  border: none;
  background-color: #ffffff;
  cursor: pointer;
`;

export const QuestionText = styled.p`
  margin: 0;
  color: #161716;
  font-size: 16px;
  font-weight: 500;
`;

export const AnswerBox = styled.div`
  padding: 22px 32px;
  background-color: #f5f7ed;
`;

export const AnswerText = styled.p`
  margin: 0;
  color: #0b4112;
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
  border-bottom: 1px solid #e5ebcf;
  cursor: pointer;
`;

export const ResultText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ResultTitle = styled.p`
  margin: 0;
  color: #000;
  font-size: 16px;
  font-weight: 700;
`;
