// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ApartamentoToken is ERC20 {
    constructor() ERC20("Apartamento Token", "APT") {
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }
}