import styled from "styled-components";

export const PageWrapper = styled.div`
  max-width: 480px;
  margin: 0 auto;
  background: white;
  min-height: 100vh;
`;

export const DayNav = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 16px 0;
  border-bottom: 1px solid #f1f3f5;
`;

export const DayTab = styled.div<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  color: ${(props) => (props.$active ? "#277B31" : "#9E9E9E")};
`;

export const Label = styled.span`
  font-size: 24px;
  font-weight: 700;
  margin: 10px 0;
`;

export const DateText = styled.span`
  font-size: 14px;
  font-weight: 500;
  display: flex;
  gap: 5px;
`;

export const ListSection = styled.div`
  padding: 20px;
  h2 {
    font-size: 20px;
    margin-bottom: 16px;
  }
`;

export const MapInfoText = styled.p`
  font-size: 12px;
  color: #adb5bd;
  text-align: center;
`;

export const BoothList = styled.div`
  font-weight: 700;
  font-size: 24px;
  margin: 10px 0;
`;

export const BoothCur = styled.div`
  display: flex;
  font-size: 13px;
  font-weight: 500;
  margin: 20px 0;
`;

export const BoothAmount = styled.div`
  font-weight: 700;
  color: #0b4112;
`;

export const MapHugger = styled.div`
  width: 100%;
  height: 402px;
  overflow: hidden;
  position: relative;
`;
