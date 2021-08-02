const environment = 'production'

const urls = {
  local: 'http://localhost:5000',
  production: 'https://pokerplanning-da-galera.herokuapp.com'
}

const ROOT_URL = urls[environment]

const roomStatuses = {
  waiting: 'waiting',
  reveal: 'reveal'
}

const actions = {
  sse: {
    playerNameConflict: 'playerNameConflict'
  }
}

export {
  ROOT_URL,
  roomStatuses,
  actions,
  environment
}