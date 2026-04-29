import styled from "styled-components";
import { theme } from "./theme";

export const PhotoCardWrapper = styled.div`
  flex-direction: column;
  align-items: center;
  display: flex;
`;

export const PhotoCard = styled.div`
  border-radius: 4px;
  padding: 12px;
  height: 140px;
  width: 100%;
  gap: 12px;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.bg.neutral};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

export const Photo = styled.img`
  width: 100%;
  height: 82.69px;
  max-height: 170px;
  object-fit: cover;
  border-radius: 4px;
`;
export const PhotoTitle = styled.div`
  font-family: ${theme.typography.h4};
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const VoteIcon = styled.img`
  cursor: pointer;
  margin: 10px;
`;

export const PhotoImgWrapper = styled.div`
  position: relative;
`;
export const ZoomIcon = styled.img`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 24px;
  cursor: pointer;
`;
