//Here we write deploy script over script folder.
const { network } = require("hardhat")
const {
  networkConfig,
  developementChains,
} = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
require("dotenv").config()

module.exports = async (hre) => {
  //We fetch getNameAccounts, deployments from hrf(hardhat runtime enviorement)
  const { getNamedAccounts, deployments } = hre

  //we get deploy and log function from deployments object & deployer from getNameAccounts
  const { deploy, log } = deployments

  //getNameAccounts get privates keys from accounts
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId

  let ethUsdPriceFeedAddress

  if (developementChains.includes(network.name)) {
    const ethUsdAggregator = await deployments.get("MocksV3Aggregator")
    ethUsdPriceFeedAddress = ethUsdAggregator.ethUsdPriceFeedAddress
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
  }

  const arg = [ethUsdPriceFeedAddress]

  const fundMe = await deploy("FundMe", {
    from: deployer, //Take private key of the owners accounts
    args: arg, //Arguments for the constructor
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  })

  if (
    !developementChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(fundMe.address, arg)
  }
}

module.exports.tags = ["all", "main"]
