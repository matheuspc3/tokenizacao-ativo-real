// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RealEstateToken {
    string public name = "ImovelToken";
    string public symbol = "IMV";
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    address public owner;

    constructor(uint256 _initialSupply) {
        owner = msg.sender;
        totalSupply = _initialSupply;
        balanceOf[owner] = _initialSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "Saldo insuficiente");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        return true;
    }
}