export const parseSort = (
  sort: string | undefined,
  allowedFields: string[],
  defaultSort = '-createdAt'
) => {
  if (!sort) {
    return defaultSort
  }

  const fields = sort.split(',')

  return fields
    .filter((field) => {
      const fieldName = field.startsWith('-') ? field.slice(1) : field

      return allowedFields.includes(fieldName)
    })
    .join(' ')
}
