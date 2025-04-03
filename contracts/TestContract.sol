// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title TestContract
 * @dev A simple contract to test GitHub Actions CI/CD pipeline
 */
contract TestContract {
    address public owner;
    string public testString;
    uint256 public testValue;
    
    event TestValueSet(uint256 indexed oldValue, uint256 indexed newValue);
    event TestStringSet(string oldString, string newString);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "TestContract: caller is not the owner");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        testString = "Initial test string";
        testValue = 0;
    }
    
    /**
     * @dev Set the test string value
     * @param _newString New string to store
     */
    function setTestString(string memory _newString) public onlyOwner {
        string memory oldString = testString;
        testString = _newString;
        emit TestStringSet(oldString, _newString);
    }
    
    /**
     * @dev Set the test uint value
     * @param _newValue New value to store
     */
    function setTestValue(uint256 _newValue) public onlyOwner {
        uint256 oldValue = testValue;
        testValue = _newValue;
        emit TestValueSet(oldValue, _newValue);
    }
    
    /**
     * @dev Get both test values in a single call
     * @return The current test string and value
     */
    function getTestData() public view returns (string memory, uint256) {
        return (testString, testValue);
    }
    
    /**
     * @dev Transfer ownership of the contract to a new account
     * @param newOwner The address of the new owner
     */
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "TestContract: new owner is the zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}
