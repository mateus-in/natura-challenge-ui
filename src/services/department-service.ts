import { Department } from '../interfaces'
import { api } from '../lib'

export async function fetchDepartments(): Promise<Department[]> {
  const { data } = await api.get('/departments', {
    params: {
      skip: 0,
      take: 6,
    },
  })

  return data.departments
}
