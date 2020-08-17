// documentation types
export type Rem = number
export type Pixel = number
export type Opacity = number

export type Required<T> = T extends object
  ? { [P in keyof T]-?: NonNullable<T[P]> }
  : T
