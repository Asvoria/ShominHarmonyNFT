// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SHOMIN is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address payable private deployWallet;

    constructor() ERC721("Shomin's Secret Corner Pass 2022", "SSC-TE\u039BEIO\u03A3") {
        deployWallet = payable(address(msg.sender));
    }

    function mintNFT(address recipient, string memory tokenURI)
        internal 
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function buyMembership(string memory newURI) public payable {
        require(msg.sender != address(0));
        mintNFT(msg.sender, newURI);

        uint256 etherUsed = msg.value;
        require(etherUsed > 0);
        payable(deployWallet).transfer(etherUsed);
    }
}