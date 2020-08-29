import { Color } from "../styles/Colors"

type ColorCategory = "primary" | "secondary" | "error"

type AppColors = Record<ColorCategory, Color>

type AppTheme = {
  colors: AppColors
}

const DefaultTheme: AppTheme = {
  colors: {
    primary: "darkPurple",
    secondary: "englishViolet",
    error: "errorRed"
  }
}

export { DefaultTheme }
