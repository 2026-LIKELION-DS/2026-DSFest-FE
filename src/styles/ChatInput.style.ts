import styled from "styled-components";
import { theme } from "../styles/theme";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 15px;

  padding: 12px 15px;
`;

export const Input = styled.input`
  flex: 1;
  min-width: 0;
  height: 44px;

  border-radius: 22px;
  border: 1px solid ${({ theme }) => theme.colors.stroke.subtle};

  padding: 0 16px;
  outline: none;

  font-family: ${theme.typography.bodySm.fontFamily};
  font-weight: ${theme.typography.bodySm.fontWeight};

  font-size: 14px;
  line-height: 16px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.fg.subtle};
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

  padding: 0;
`;
