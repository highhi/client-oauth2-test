const ClientOAuth = require('client-oauth2')

const STORAGE = 'client-oauth2-token'

const oauth = new ClientOAuth({
  clientId: process.env.INOREADER_CLIENT_ID,
  clientSecret: process.env.INOREADER_CLIENT_SECRET,
  accessTokenUri: '/oauth2/token',
  authorizationUri: 'https://www.inoreader.com/oauth2/auth',
  redirectUri: 'http://localhost:9000/auth.html',
  scopes: ['read', 'write'],
  state: 'test',
})

export function getToken() {
  const savedTokenJson = loadToken()
  if (!savedTokenJson) return Promise.reject(new Error('Token is not found'))
  const token = oauth.createToken(
    savedTokenJson.accessToken,
    savedTokenJson.refreshToken,
    savedTokenJson.tokenType,
    {}
  )
  token.expiresIn(savedTokenJson.expires)

  if (token.expired()) {
    return token.refresh().then(updatedToken => {
      this.saveToken(updatedToken)
      return updatedToken
    })
  }

  return Promise.resolve(token);
}

export function saveToken(token) {
  const tokenJson = {
    accessToken: token.accessToken,
    refreshToken: token.refreshToken,
    tokenType: token.tokenType,
    expires: token.expires,
  }

  window.localStorage.setItem(STORAGE, JSON.stringify(tokenJson))
}

export function loadToken() {
  const saveTokenString = window.localStorage.getItem(STORAGE)
  if (!saveTokenString) return
  const parsed = JSON.parse(saveTokenString)
  return {
    accessToken: parsed.accessToken,
    refreshToken: parsed.refreshToken,
    tokenType: parsed.tokenType,
    expires: new Date(parsed.expires)
  }
}

export function saveTokenFromCallbackURL(url) {
  window.localStorage.removeItem(STORAGE)
  return oauth.code.getToken(url).then(token => {
    saveToken(token)
    return token
  })
}

export function getNewTokenUrl() {
  return oauth.code.getUri()
}
