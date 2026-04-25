import styled from "styled-components";

export const ImageDetailPage = styled.main`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #000;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const ImageContent = styled.div`
  width: 100%;
  max-width: 402px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 24px 0;
  box-sizing: border-box;
`;

export const ImageModalCount = styled.p`
  color: #f2f2f2;
  font-size: 24px;
  font-weight: 700;
`;

export const ImageModalImage = styled.div`
  width: 100%;
  height: 500px;
  background-color: #d9d9d9;
`;

export const ImageModalCloseButton = styled.button`
  width: 354px;
  height: 44px;
  border: none;
  border-radius: 100px;
  background-color: #ffffff;
  color: #000;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;
