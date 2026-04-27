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

export const Item = styled.button<{ active: boolean }>`
  width: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: none;
  background: transparent;
  cursor: pointer;

  color: ${({ theme, active }) =>
    active ? theme.colors.bg.brand : theme.colors.fg.subtle};
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
