// 컬러 팔레트
export const colors = {
  // Primitive
  grey: {
    50: "#F2F2F2",
    100: "#D6D6D6",
    300: "#9E9E9E",
    400: "#828282",
    black: "#161716",
  },

  yellow: {
    50: "#FDF7E7",
    100:"#FCEFD1",
  },

  olive: {
    50: "#F5F7ED",
    100: "#E5EBCF",
  },

  green: {
    700: "#277931",
    950: "#064112",
  },

  red: {
    200: "#E49090",
    500: "#F22128",
  },

  // Semantic
  fg: {
    primary: "#161716",
    subtle: "#9E9E9E",
    primaryInverted: "#F2F2F2",
    disabled: "#828282",
    critical: "#F22128",
  },

  stroke: {
    primaryInverted: "#F2F2F2",
    subtle: "#9E9E9E",
    oliveLight: "#E5EBCF",
  },

  bg: {
    disabled: "#D6D6D6",
    neutralDeep: "#F2F2F2",
    neutral: "#FFFEFB",
    critical: "#F22128",
    criticalLight: "#F4C0C0",
    offWhite: "#FFFFFF",
    oliveLight: "#F5F7ED",
    olive: "#E5EBCF",
    yellowLight: "#FDF7E7",
    brand: "#064112",
    brandLight: "#277931",
    greenGradient: "linear-gradient(180deg, #277931 0%, #064112 100%)",
  },
} as const;

export type ColorsType = typeof colors;
