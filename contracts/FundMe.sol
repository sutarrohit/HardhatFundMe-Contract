// Objective:
// 1. Receive ETH from sender
// 2. Withdraw ETH to the Owner address
// 3. Set minimum ETH limit for sender
//-----------------------------------------------------------------------------------

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConvertor.sol";

contract FundMe {
    using PriceConvertor for uint256;

    address owner;
    //Minimun USD send should sent
    uint256 constant MinimumUSD = 50;
    address[] public Funders;
    uint256 max;
    mapping(address => uint256) public addressToAmount;

    AggregatorV3Interface public priceFeed;

    constructor(address priceFeedAddress) {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    function fund() public payable {
        require(
            msg.value.getConversion(priceFeed) >= MinimumUSD,
            "Don't send enough ETH"
        ); // 1e18 wei = 1ETH
        Funders.push(msg.sender);
        addressToAmount[msg.sender] = msg.value;
    }

    modifier ownerOnly() {
        require(msg.sender == owner, "Only owner can access");
        _;
    }

    function withdraw() public ownerOnly {
        for (
            uint256 FunderIndex = 0;
            FunderIndex < Funders.length;
            FunderIndex++
        ) {
            address funder = Funders[FunderIndex];
            addressToAmount[funder] = 0;
        }

        //Reset Funder Array
        Funders = new address[](0);

        //Transfer function 2300 gas or Throw error (Revert Transaction)
        // payable (msg.sender).transfer(address(this).balance);

        //Send function 2300 gas or send bool value(Not Revert Transaction)
        // bool sendSuccess = payable (msg.sender).send(address(this).balance);
        // require(sendSuccess, "Send Failed")

        //Call function we can set gas fee and return bool value & data (Not  Revert Transaction)
        (bool callSucess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSucess, "Call Failed");
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }
}
