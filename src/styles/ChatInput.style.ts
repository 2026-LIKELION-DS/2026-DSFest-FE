import styled from "styled-components";
import { theme } from "../styles/theme";

export const Container = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 20px;
  background: ${({ theme }) => theme.colors.bg.neutral};
`;

export const Input = styled.input`
  width: 298px;
  height: 44px;
  border-radius: 22px;
  border: 1px solid ${({ theme }) => theme.colors.stroke.subtle};
  padding: 0 16px;

  font-family: ${theme.typography.bodySm.fontFamily};
  font-weight: ${theme.typography.bodySm.fontWeight};
  font-size: ${theme.typography.bodySm.fontSize};
  line-height: ${theme.typography.bodySm.lineHeight};
`;

export const SendButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;

  background: ${({ theme }) => theme.colors.bg.brand};
  display: flex;
  align-items: center;
  justify-content: center;
`;
