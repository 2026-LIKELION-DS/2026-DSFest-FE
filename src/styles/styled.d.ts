import "styled-components";
import type { ColorsType } from "../lib/colorPalette";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: ColorsType;
  }
}
