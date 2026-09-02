export type PaginationOptions = {
  page?: number
  limit?: number
}

export const getPagination = ({ page = 1, limit = 10 }: PaginationOptions) => {
  const skip =
    (page >= 1 ? page - 1 : 0) * (limit >= 1 ? (limit <= 100 ? limit : 100) : 1)

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
