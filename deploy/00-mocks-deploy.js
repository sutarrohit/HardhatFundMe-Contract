const { network } = require("hardhat")
const {
  developementChains,
  DECIMALS,
  INITIAL_ANSWER,
} = require("../helper-hardhat-config")

module.exports = async (hre) => {
  const { getNamedAccounts, deployments } = hre

  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  console.log(deployer)

  if (developementChains.includes(network.name)) {
    console.log("This is Mocks")
    await deploy("MocksV3Aggregator", {
      contract: "MocksV3Aggregator",
      from: deployer,
      log: true,
      arg: [DECIMALS, INITIAL_ANSWER],
    })
    log("Mocks deployed")
    log("--------------------------------------------------------")
  }
}

module.exports.tags = ["all", "mocks"]
