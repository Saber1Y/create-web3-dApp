// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/MyToken.sol";

contract MyTokenTest is Test {
    MyToken token;

    function setUp() public {
        token = new MyToken(1000);
    }

    function testInitialSupply() public {
        assertEq(token.totalSupply(), 1000);
        assertEq(token.balanceOf(address(this)), 1000);
    }
}
