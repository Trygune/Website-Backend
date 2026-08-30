export type PaginationOptions = {
  page?: number
  limit?: number
}

export const getPagination = ({ page = 1, limit = 10 }: PaginationOptions) => {
  const skip = (page - 1) * limit

  return {
    page,
    limit,
    skip,
  }
}

export const getPaginationMeta = ({
  page,
  limit,
  total,
}: {
  page: number
  limit: number
  total: number
}) => {
  const totalPages = Math.ceil(total / limit)

  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  }
}

export const getArrayQuery = (arrayQuery: unknown) => {
  return arrayQuery
    ? String(arrayQuery)
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    : undefined
}

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
