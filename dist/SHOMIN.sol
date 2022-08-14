// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

library Counters {
    struct Counter {
        uint256 _value; // default: 0
    }
    function current(Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }
    function increment(Counter storage counter) internal {
        unchecked {
            counter._value += 1;
        }
    }
}

contract SSCCL is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address payable private deployWallet;

    constructor() ERC721("Shomin's Secret Corner", "SSC-TE\u039BEIO\u03A3") {
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

    function totalIDs() public view returns (uint256) {
        return _tokenIds.current();
    }

    function buyMembership(string memory newURI) public payable {
        require(msg.sender != address(0));
        mintNFT(msg.sender, newURI);

        uint256 etherUsed = msg.value;
        require(etherUsed > 0);
        payable(deployWallet).transfer(etherUsed);
    }
}