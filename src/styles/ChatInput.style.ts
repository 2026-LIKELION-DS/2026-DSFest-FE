import styled from "styled-components";
import { theme } from "../styles/theme";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  padding: 12px 20px;
`;

export const Input = styled.input`
  flex: 1;
  min-width: 0;
  max-width: 298px;
  height: 44px;

  border-radius: 22px;
  border: 1px solid ${({ theme }) => theme.colors.stroke.subtle};
  padding: 0 16px;
  outline: none;

  font-family: ${theme.typography.bodySm.fontFamily};
  font-weight: ${theme.typography.bodySm.fontWeight};
  font-size: 16px;
  line-height: ${theme.typography.bodySm.lineHeight};

  @media (min-width: 768px), (hover: hover) and (pointer: fine) {
    max-width: none;
  }
`;
export const SendButton = styled.button`
  flex: 0 0 44px;
  width: 44px;
  height: 44px;

  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.colors.bg.brand};

  display: flex;
  align-items: center;
  justify-content: center;
`;
