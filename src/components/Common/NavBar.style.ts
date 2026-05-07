import styled from "styled-components";

export const Container = styled.nav`
  height: 60px;
  display: flex;
  justify-content: center;
  gap: 4px;
  align-items: center;
  border-top: 0.5px solid ${({ theme }) => theme.colors.stroke.oliveLight};
  background: ${({ theme }) => theme.colors.bg.neutral};
`;

export const Item = styled.button<{ $active: boolean }>`
  width: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: none;
  background: transparent;
  cursor: pointer;

  color: ${({ theme, $active }) =>
    $active ? theme.colors.bg.brand : theme.colors.fg.subtle};
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

export const Label = styled.span`
  font-size: 12px;
  font-weight: 500;
`;
export const IconWrapper = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
`;
export const Badge = styled.span`
  position: absolute;
  top: -6px;
  right: -10px;

  min-width: 16px;
  height: 16px;
  padding: 0 4px;

  border-radius: 999px;
  background: #ff3b30;
  color: white;

  font-size: 10px;
  font-weight: 700;
  line-height: 16px;
  text-align: center;
`;
