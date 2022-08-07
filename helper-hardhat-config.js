const networkConfig = {
  4: {
    name: "rinkeby",
    ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
  },

  69: {
    name: "kovan",
    ethUsdPriceFedd: "0x9326BFA02ADD2366b30bacB125260Af641031331",
  },

  80001: {
    name: "mumbai",
    ethUsdPriceFedd: "	0x7d7356bF6Ee5CDeC22B216581E48eCC700D0497A",
  },
}
const developementChains = ["hardhat", "localhost"]
const DECIMALS = 8
const INITIAL_ANSWER = 200000000000

module.exports = {
  networkConfig,
  developementChains,
  DECIMALS,
  INITIAL_ANSWER,
}
