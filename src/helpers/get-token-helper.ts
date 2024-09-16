import cookies from 'js-cookie'

export function getToken(): string {
  return cookies.get('NaturaChallenge:Token') || ''
}
