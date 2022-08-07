// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

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

contract SHOMIN is ERC721 {
    using Counters for Counters.Counter;
    using Strings for uint256;
    // Optional mapping for token URIs
    mapping(uint256 => string) private _tokenURIs;
    Counters.Counter public _tokenIds;
    address payable private deployWallet;

    constructor() ERC721("Shomin's Secret Corner", "SSC-TE\u039BEIO\u03A3") {
        deployWallet = payable(address(msg.sender));
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireMinted(tokenId);

        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();

        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }

        return super.tokenURI(tokenId);
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }
    
    function buyMembership(string memory newURI) public payable {
        require(msg.sender != address(0));
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, newURI);

        uint256 etherUsed = msg.value;
        require(etherUsed > 0);
        payable(deployWallet).transfer(etherUsed);
    }
}