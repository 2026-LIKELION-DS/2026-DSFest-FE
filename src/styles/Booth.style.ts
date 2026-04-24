import styled from "styled-components";

export const PageWrapper = styled.div`
  max-width: 480px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.bg.neutral};
  min-height: 100vh;
`;

export const DayNav = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.stroke.oliveLight};
`;

export const DayTab = styled.div<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.bg.brandLight : theme.colors.fg.subtle};
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
    color: ${({ theme }) => theme.colors.fg.primary};
    margin-bottom: 16px;
  }
`;

export const MapInfoText = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.fg.subtle};
  text-align: center;
`;

export const BoothList = styled.div`
  font-weight: 700;
  font-size: 24px;
  margin: 10px 0;
  color: ${({ theme }) => theme.colors.fg.primary};
`;

export const BoothCur = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 500;
  margin: 20px 0;
  color: ${({ theme }) => theme.colors.fg.primary};
`;

export const BoothAmount = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.bg.brandLight};
`;

export const MapHugger = styled.div`
  width: 100%;
  height: 402px;
  overflow: hidden;
  position: relative;
`;

export const FilterButton = styled.button<{ $active: boolean }>`
  background: ${({ $active, theme }) =>
    $active ? theme.colors.bg.brand : theme.colors.bg.neutral};

  color: ${({ $active, theme }) =>
    $active ? theme.colors.fg.primaryInverted : theme.colors.fg.primary};

  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.bg.brand : theme.colors.stroke.subtle};

  padding: 8px 15px;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 10px;
  transition: all 0.1s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;
