import Cookies from 'js-cookie'

const TokenKey = 'token'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, expires = null) {
  console.log(expires)
  if (expires == null) {
    return Cookies.set(TokenKey, token)
  }
  return Cookies.set(TokenKey, token, { expires: expires })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

