import styled from "styled-components";

export const Container = styled.nav`
  height: 60px;
  display: flex;
  justify-content: center;
  gap: 4px;
  align-items: center;
  border-top: 0.5px solid #e5ebcf;
  background: #fffefb;
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

  color: ${({ active }) => (active ? "#0B4112" : "#9E9E9E")};
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
