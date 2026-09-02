export const parseArrayQuery = (arrayQuery: unknown) => {
  return arrayQuery
    ? String(arrayQuery)
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    : undefined
}
