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
  color: ${(props) => (props.$active ? "#1a4314" : "#adb5bd")};
  .label {
    font-size: 12px;
    font-weight: 800;
  }
`;
