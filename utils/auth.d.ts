declare module '#auth-utils' {
  interface User {
    id: string
    email: string
    token: string
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date
  }

  interface UserSession {
    user: User
  }
}

export {}