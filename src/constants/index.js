const environment = 'production'

const httpUrls = {
  local: 'http://localhost:5000',
  production: 'https://pokerplanning-da-galera.herokuapp.com'
}

const wsUrls = {
  local: 'ws://localhost:5000',
  production: 'wss://pokerplanning-da-galera.herokuapp.com'
}

const ROOT_URL = httpUrls[environment]
const WS_URL = wsUrls[environment]

const roomStatuses = {
  waiting: 'waiting',
  reveal: 'reveal'
}

export {
  ROOT_URL,
  WS_URL,
  roomStatuses,
  environment
}