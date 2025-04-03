// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title SimpleTestContract
 * @dev A simple contract for testing GitHub Actions CI/CD pipeline without OpenZeppelin dependencies
 */
contract SimpleTestContract {
    // State variables
    address public owner;
    uint256 public itemCount;
    uint256 public fee; // in basis points (e.g., 250 = 2.5%)
    address public feeCollector;
    
    // Mapping from item ID to item info
    mapping(uint256 => Item) public items;
    
    // Event declarations
    event ItemAdded(uint256 indexed itemId, string name, uint256 price, address owner);
    event ItemPurchased(uint256 indexed itemId, address seller, address buyer, uint256 price);
    event FeeUpdated(uint256 oldFee, uint256 newFee);
    event FeeCollectorUpdated(address oldCollector, address newCollector);
    
    // Struct to store item information
    struct Item {
        string name;
        string description;
        uint256 price;
        address owner;
        bool forSale;
    }
    
    // Modifier to restrict access to owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }
    
    // Modifier to prevent reentrancy attacks
    bool private locked;
    modifier noReentrancy() {
        require(!locked, "No reentrancy allowed");
        locked = true;
        _;
        locked = false;
    }
    
    /**
     * @dev Constructor - set the owner and initial fee
     * @param initialFee The initial transaction fee percentage (in basis points)
     * @param initialFeeCollector The address that will collect transaction fees
     */
    constructor(uint256 initialFee, address initialFeeCollector) {
        require(initialFee <= 1000, "Fee cannot exceed 10%");
        require(initialFeeCollector != address(0), "Fee collector cannot be zero address");
        
        owner = msg.sender;
        fee = initialFee;
        feeCollector = initialFeeCollector;
        itemCount = 0;
        locked = false;
    }
    
    /**
     * @dev Add a new item to the marketplace
     * @param name Item name
     * @param description Item description
     * @param price Item price in wei
     * @param forSale Whether the item is immediately available for sale
     */
    function addItem(string memory name, string memory description, uint256 price, bool forSale) external {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(price > 0, "Price must be greater than zero");
        
        uint256 newItemId = itemCount;
        
        items[newItemId] = Item({
            name: name,
            description: description,
            price: price,
            owner: msg.sender,
            forSale: forSale
        });
        
        itemCount++;
        
        emit ItemAdded(newItemId, name, price, msg.sender);
    }
    
    /**
     * @dev Purchase an item
     * @param itemId The ID of the item to purchase
     */
    function purchaseItem(uint256 itemId) external payable noReentrancy {
        require(itemId < itemCount, "Item does not exist");
        
        Item storage item = items[itemId];
        
        require(item.forSale, "Item is not for sale");
        require(item.owner != msg.sender, "Cannot buy your own item");
        require(msg.value >= item.price, "Insufficient payment");
        
        address seller = item.owner;
        uint256 itemPrice = item.price;
        
        // Calculate fee amount
        uint256 feeAmount = (itemPrice * fee) / 10000;
        uint256 sellerAmount = itemPrice - feeAmount;
        
        // Update item ownership
        item.owner = msg.sender;
        item.forSale = false;
        
        // Transfer fee to collector
        if (feeAmount > 0) {
            (bool feeSuccess, ) = feeCollector.call{value: feeAmount}("");
            require(feeSuccess, "Fee transfer failed");
        }
        
        // Transfer funds to seller
        (bool sellerSuccess, ) = seller.call{value: sellerAmount}("");
        require(sellerSuccess, "Seller payment failed");
        
        // Refund excess payment if any
        uint256 excess = msg.value - itemPrice;
        if (excess > 0) {
            (bool refundSuccess, ) = msg.sender.call{value: excess}("");
            require(refundSuccess, "Refund failed");
        }
        
        emit ItemPurchased(itemId, seller, msg.sender, itemPrice);
    }
    
    /**
     * @dev Toggle whether an item is for sale
     * @param itemId The item ID to update
     * @param isForSale Whether the item should be for sale
     */
    function setItemForSale(uint256 itemId, bool isForSale) external {
        require(itemId < itemCount, "Item does not exist");
        require(items[itemId].owner == msg.sender, "Not the item owner");
        
        items[itemId].forSale = isForSale;
    }
    
    /**
     * @dev Update the transaction fee percentage
     * @param newFee The new fee percentage (in basis points)
     */
    function updateFee(uint256 newFee) external onlyOwner {
        require(newFee <= 1000, "Fee cannot exceed 10%");
        
        uint256 oldFee = fee;
        fee = newFee;
        
        emit FeeUpdated(oldFee, newFee);
    }
    
    /**
     * @dev Update the fee collector address
     * @param newFeeCollector The new address to collect fees
     */
    function updateFeeCollector(address newFeeCollector) external onlyOwner {
        require(newFeeCollector != address(0), "Fee collector cannot be zero address");
        
        address oldCollector = feeCollector;
        feeCollector = newFeeCollector;
        
        emit FeeCollectorUpdated(oldCollector, newFeeCollector);
    }
}