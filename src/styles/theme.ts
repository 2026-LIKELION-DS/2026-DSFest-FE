import { colors } from "../lib/colorPalette";

export const typography = {
  h1: {
    fontFamily: "Pretendard",
    fontWeight: 700,
    fontSize: "24px",
    lineHeight: "36px",
  },
  h2: {
    fontFamily: "Pretendard",
    fontWeight: 700,
    fontSize: "20px",
    lineHeight: "30px",
  },
  h3: {
    fontFamily: "Pretendard",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "24px",
  },
  h4: {
    fontFamily: "Pretendard",
    fontWeight: 700,
    fontSize: "14px",
    lineHeight: "21px",
  },
  bodyLg: {
    fontFamily: "Pretendard",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "24px",
  },
  bodyMd: {
    fontFamily: "Pretendard",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "21px",
  },
  bodySm: {
    fontFamily: "Pretendard",
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: "18px",
  },
  buttonMd: {
    fontFamily: "Pretendard",
    fontWeight: 700,
    fontSize: "14px",
    lineHeight: "21px",
  },
  buttonSm: {
    fontFamily: "Pretendard",
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: "18px",
  },
  decorationMd: {
    fontFamily: "OwnglyphSeaBreeze",
    fontWeight: 400,
    fontSize: "18px",
    lineHeight: "24px",
  },
  decorationSm: {
    fontFamily: "OwnglyphSeaBreeze",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "18px",
  },
} as const;

export const theme = {
  colors,
  typography,
};
