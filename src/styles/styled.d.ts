import "styled-components";
import type { AppTheme } from "../utils/theme";

declare module "styled-components" {
  export interface DefaultTheme extends AppTheme {}
}
