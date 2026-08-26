declare global {
  namespace Express {
    interface User {
      id: string
      role: 'ADMIN'
    }
  }
}

export {}
