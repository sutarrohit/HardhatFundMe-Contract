require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("dotenv").config()
require("solidity-coverage")
require("hardhat-gas-reporter")

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const PRIVATE_KEY_2 = process.env.PRIVATE_KEY_2
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const GANACHE_RPC_URL = process.env.GANACHE_RPC_URL
const PRIVATE_KEY_GANACHE = process.env.PRIVATE_KEY_GANACHE
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.8" },
      { version: "0.6.6" },
      { version: "0.6.0" },
    ],
  },

  defaultNetwork: "rinkeby",

  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY, PRIVATE_KEY_2],
      chainId: 4,
      blockConfirmations: 6,
    },
  },

  namedAccounts: {
    deployer: {
      default: 0,
      account1: 1,
    },
  },

  etherscan: {
    apiKey: {
      rinkeby: ETHERSCAN_API_KEY,
    },
  },

  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    token: "ETH",
  },
}
