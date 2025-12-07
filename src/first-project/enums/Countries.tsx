export const Countries = {
  Brazil: "Brazil",
  France: "France",
  Palestine: "Palestine",
} as const;

export type Country = typeof Countries[keyof typeof Countries];