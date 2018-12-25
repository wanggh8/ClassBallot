// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    testrpc_150: {
      network_id: 201,
      host: "192.168.1.150",
      port: 8545
    },
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*' // Match any network id
    }
  }
}
