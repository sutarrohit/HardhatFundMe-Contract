const { assert, expect } = require("chai")
const { deployment, ethers, getNamedAccounts, network } = require("hardhat")

describe("FundMe", async () => {
  let fundMe
  let deployer

  beforeEach(async () => {
    /**It will give account details */
    // const accounts = await ethers.getSingers()
    // const accountZero = accounts[0]
    deployer = (await getNamedAccounts()).deployer

    /**It will deploy all scripts under test folder*/
    //await deployment.fixture(["all"])

    /**It will give latest deployed contract  */
    fundMe = await ethers.getContract("FundMe", deployer)
    const chainId = network.config.chainId
  })

  describe("fund", async () => {
    const sendValue = "1000000000"
    it("Fails if don't send enought eth ", async () => {
      expect(await fundMe.fund({ value: sendValue }))
    })
  })
})
