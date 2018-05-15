const { saveTokenFromCallbackURL } = require('./util/oauth')

saveTokenFromCallbackURL(location.href).then(token => {
  location.href = '/'
})
