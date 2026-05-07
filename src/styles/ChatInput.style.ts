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
  line-height: 16px;

  transform: scale(0.875);
  transform-origin: left center;

  width: calc(100% / 0.875);

  @media (min-width: 768px), (hover: hover) and (pointer: fine) {
    max-width: none;
    transform: none;
    width: 100%;
    font-size: 14px;
  }
`;
//모바일에서 포커스 안 되게 끔
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
