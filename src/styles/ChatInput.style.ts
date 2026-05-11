import styled from "styled-components";
import { theme } from "../styles/theme";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 15px;

  background: ${({ theme }) => theme.colors.bg.neutral};
`;

export const InputBox = styled.div`
  flex: 1;
  min-width: 0;
  height: 44px;
`;

export const Input = styled.input<{ $isOverLimit: boolean }>`
  width: calc(100% / 0.875);
  height: calc(44px / 0.875);

  border-radius: calc(22px / 0.875);

  border: 1px solid
    ${({ theme, $isOverLimit }) =>
      $isOverLimit ? theme.colors.fg.critical : theme.colors.stroke.subtle};

  background: ${({ theme }) => theme.colors.bg.neutral};

  padding: 0 calc(16px / 0.875);
  outline: none;

  font-family: ${theme.typography.bodySm.fontFamily};
  font-weight: ${theme.typography.bodySm.fontWeight};

  font-size: 16px;
  line-height: 16px;

  transform: scale(0.875);
  transform-origin: left top;

  &:focus {
    border-color: ${({ theme, $isOverLimit }) =>
      $isOverLimit ? theme.colors.fg.critical : theme.colors.bg.brand};
  }

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
