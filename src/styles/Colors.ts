enum Colors {
  black = "#000",
  darkPurple = "#2C1320",
  englishViolet = "#5F4B66",
  wildBlueYonder = "#A7ADC6",
  coolGrey = "#8797AF",
  blackCoral = "#56667A",
  lightGrey = "#ccc",
  white = "#fff",
  black10 = "rgba(0,0,0,.1)",
  black20 = "rgba(0,0,0,.2)",
  black30 = "rgba(0,0,0,.3)",
  black40 = "rgba(0,0,0,.4)",
  black50 = "rgba(0,0,0,.5)",
  black60 = "rgba(0,0,0,.6)",
  black70 = "rgba(0,0,0,.7)",
  black80 = "rgba(0,0,0,.8)",
  black90 = "rgba(0,0,0,.9)",
  errorRed = "#ff0033"
}

export type Color = keyof typeof Colors

export { Colors }
