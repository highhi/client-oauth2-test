const { getNewTokenUrl } = require('./util/oauth')
const { getRequest } = require('./util/api')

const authentication = document.getElementById('authentication')
authentication.href = getNewTokenUrl()

getRequest('/api/0/user-info')
