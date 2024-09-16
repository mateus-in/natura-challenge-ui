import { User } from '../interfaces'
import { api } from '../lib'

interface Params {
  email: string
  password: string
}

interface Response {
  token: string
}

export async function signIn(params: Params): Promise<Response> {
  const { email, password } = params

  const response = await api.post('/sign-in', {
    email,
    password,
  })

  return response.data
}

export async function getAuthenticatedUser(token: string): Promise<User> {
  const response = await api.get('/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}
