import styled from "styled-components";
import { theme } from "./theme";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.bg.neutral};

  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 24px;
`;

export const Title = styled.h1`
  text-align: center;
  font-family: ${theme.typography.h1.fontFamily};
  font-weight: ${theme.typography.h1.fontWeight};
  font-size: ${theme.typography.h1.fontSize};
  line-height: ${theme.typography.h1.lineHeight};

  margin-bottom: 40px;

  color: ${({ theme }) => theme.colors.bg.brandLight};
`;

export const Label = styled.div`
  margin-bottom: 6px;
  font-size: 14px;
  margin-left: 5px;
  font-family: ${theme.typography.h4.fontFamily};
  font-weight: ${theme.typography.h4.fontWeight};
  font-size: ${theme.typography.h4.fontSize};
  line-height: ${theme.typography.h4.lineHeight};
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.colors.fg.subtle};
  padding: 0 16px;
  margin-bottom: 20px;
  &::placeholder {
    color: ${({ theme }) => theme.colors.fg.subtle};
    font-family: ${theme.typography.bodySm};
    font-weight: ${theme.typography.bodySm};
    font-size: ${theme.typography.bodySm};
    line-height: ${theme.typography.bodySm};
  }
  &:focus {
    outline: none;
  }
`;

export const Button = styled.button`
  height: 48px;
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.bg.brand};
  color: ${({ theme }) => theme.colors.fg.primaryInverted};

  border: none;
  font-weight: bold;
  margin-top: 10px;
`;
