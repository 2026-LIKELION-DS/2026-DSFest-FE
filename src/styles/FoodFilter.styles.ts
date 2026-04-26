import styled from "styled-components";
import { theme } from "./theme";

export const FilterWrapper = styled.section`
  padding: 20px 20px 16px;
  background: ${({ theme }) => theme.colors.bg.offWhite};
`;

export const CountText = styled.p`
  margin: 0 0 12px;

  font-family: ${theme.typography.bodyMd.fontFamily};
  font-weight: ${theme.typography.bodyMd.fontWeight};
  font-size: 14px;
  line-height: ${theme.typography.bodyMd.lineHeight};

  color: ${({ theme }) => theme.colors.fg.subtle};

  strong {
    font-weight: 700;
  }
`;

export const VeganLabel = styled.label<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;

  width: fit-content;
  cursor: pointer;

  color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.bg.brand : theme.colors.fg.subtle};
`;

export const RadioInput = styled.input`
  width: 16px;
  height: 16px;
  margin: 0;

  accent-color: ${({ theme }) => theme.colors.bg.brand};
  cursor: pointer;
`;

export const LeafIcon = styled.img`
  width: 16px;
  height: 16px;
`;

export const VeganText = styled.span<{ $isSelected: boolean }>`
  font-family: ${theme.typography.bodyMd.fontFamily};
  font-weight: ${theme.typography.bodyMd.fontWeight};
  font-size: ${theme.typography.bodyMd.fontSize};
  line-height: ${theme.typography.bodyMd.lineHeight};

  color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.bg.brand : theme.colors.fg.subtle};
`;
