export const paginate = (q: { page?: string; limit?: string }) => {
  const page = Math.max(1, Number(q.page) || 1)
  const limit = Math.min(100, Math.max(1, Number(q.limit) || 20))
  return { page, limit, skip: (page - 1) * limit }
}

export const meta = (total: number, page: number, limit: number) => ({
  page, limit, total, totalPages: Math.ceil(total / limit),
})
