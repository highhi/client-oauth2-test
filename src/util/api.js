const axios = require('axios')
const { getToken } = require('./oauth')

export function getRequest(path) {
  return getToken().then(token => {
    const { method, url, headers } = token.sign({
      method: 'get',
      url: path
    })

    axios({ method, url, headers })
      .then(res => console.log(res.data))
      .catch(err => { throw err })
  })
}
