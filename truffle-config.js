const path = require("path")
const HDWalletProvider = require('@truffle/hdwallet-provider')
const mnemonic = "old satoshi help kind profit firm right ensure task curve float lecture"

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `wss://ropsten.infura.io/ws/v3/129c3e4e823e47aa86199d3c14bf5456`),
      network_id: 3,       // Ropsten's id
      gas: 8000000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true,   // Skip dry run before migrations? (default: false for public nets )
      networkCheckTimeout: 10000,
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(mnemonic, "wss://rinkeby.infura.io/ws/v3/129c3e4e823e47aa86199d3c14bf5456")
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
  },
  compilers: {
    solc: {
      version: "0.8.13",      // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  }
}
