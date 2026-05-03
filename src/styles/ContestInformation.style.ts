import styled from "styled-components";
import { theme } from "./theme";
type InputStatus = "default" | "active" | "error";

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const Container = styled.div`
  background-color: #fff;
  border-radius: 4px;
  padding: 24px;
  width: 344px;
  margin: 24px;
  max-width: 480px;
  max-height: 610px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const CommonModalOverlay = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
  height: 100dvh;
  @media (min-width: 768px) or (max-height: 973px) {
    border: 12px solid ${({ theme }) => theme.colors.olive[50]};
    height: 874px;
    border-radius: 24px;
    max-width: 402px;
  }
  @media (max-height: 910px) {
    border-radius: 0;
    border: none;
  }

  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
`;

export const CommonModalContainer = styled.div`
  width: 100%;
  max-width: 354px;
  max-height: 90%;
  border-radius: 4px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ContainerTitle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.div`
  font-family: ${theme.typography.h2};
`;
export const SubTite = styled.div`
  font-family: ${theme.typography.bodyMd};
  color: ${theme.colors.fg.subtle};
`;
export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
export const Content = styled.div``;
export const NumTitle = styled.div`
  font-family: ${theme.typography.h4};
`;
export const NumBox = styled.div<{ status?: InputStatus }>`
  width: 100%;
  height: 44px;
  border-radius: 100px;
  background-color: ${theme.colors.bg.neutral};
  /* border: 0.5px solid ${theme.colors.fg.subtle}; */
  border: 1px solid
    ${({ status }) =>
      status === "error"
        ? "var(--Stroke-Critical, #F22128)"
        : status === "active"
          ? "var(--Stroke-primary, #161716)"
          : theme.colors.fg.subtle};
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Num = styled.input`
  font-family: ${theme.typography.bodySm};
  width: 90%;
  height: 40px;
  outline-style: none;
  border: none;
  background: transparent;
  &::placeholder {
    color: ${theme.colors.fg.subtle};
    font-family: ${theme.typography.bodySm};
  }
`;
export const Name = styled.input`
  font-family: ${theme.typography.bodySm};
  width: 90%;
  height: 40px;
  outline-style: none;
  border: none;
  background: transparent;
  &::placeholder {
    color: ${theme.colors.fg.subtle};
    font-family: ${theme.typography.bodySm};
  }
`;
export const Sub = styled.div`
  display: flex;
  justify-content: center;
  gap: 3px;
`;
export const CloseButton = styled.button`
  background-color: ${theme.colors.bg.offWhite};
  border: 0.5px solid ${theme.colors.stroke.subtle};
  color: ${theme.colors.fg.primary};
  width: 100%;
  font-family: ${theme.typography.buttonMd};
  padding: 10px 24px;
  border-radius: 100px;
`;
export const SubButton = styled.button`
  background-color: ${theme.colors.bg.brand};
  color: ${theme.colors.bg.neutral};
  width: 100%;
  font-family: ${theme.typography.buttonMd};
  padding: 10px 24px;
  border-radius: 100px;
`;

export const Notice = styled.div`
  font-family: ${theme.typography.bodyMd};
  color: ${theme.colors.fg.critical};

  a {
    margin-left: 3px;
    border-bottom: 0.5px solid ${theme.colors.fg.critical};
    cursor: pointer;
  }
`;
export const NoticeDupl = styled.div`
  font-family: ${theme.typography.bodyMd};
  color: ${theme.colors.fg.critical};
`;
export const NoticeContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
