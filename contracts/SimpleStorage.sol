// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SimpleStorage is ERC721 {
    uint256 count;
    address contract_owner;
    struct Art {
        string name;
        string desc;
        uint256 val;
        uint256 time;
        bool forSale;
        uint256 ownersCount;
        string url;
    }
    mapping(uint256 => Art) artMap;

    constructor() public ERC721("ART", "art") {
        contract_owner = msg.sender;
        count = 0;
    }

    event mintEvent(
        uint256 nftId,
        string hash,
        string message,
        string name,
        string desc,
        uint256 time
    );

    event buyEvent(uint256 tokenId, address owner, uint256 amount);
    event saleEvent(address by, uint256 tokenId, uint256 amount);
    event saleCancelEvent(address by, uint256 tokenId);

    // event getInfoEvent(string name, string desc, uint256 val, uint256 time ,bool forSale,uint256 ownersCount);

    function mintArt(
        string memory tokenURI,
        string memory _name,
        string memory _desc,
        uint256 _val
    ) public returns (uint256) {
        uint256 _time = now;
        Art memory newArt = Art(_name, _desc, _val, _time, true, 1, tokenURI);
        _mint(msg.sender, count);
        _setTokenURI(count, tokenURI);
        artMap[count] = newArt;
        emit mintEvent(count, tokenURI, "mint successful", _name, _desc, _time);
        count = count + 1;

        return count - 1;
    }

    function saleArt(uint256 tokenId, uint256 _amt) public returns (bool) {
        address _tokOwn = ownerOf(tokenId);
        require(
            msg.sender == _tokOwn,
            "You are not authorised to sale this art"
        );
        artMap[tokenId].forSale = true;
        // amount is considered only in ethers
        artMap[tokenId].val = _amt;
        emit saleEvent(msg.sender, tokenId, _amt);
        return true;
    }
     function cancelSaleArt(uint256 tokenId) public returns (bool) {
        address _tokOwn = ownerOf(tokenId);
        require(
            msg.sender == _tokOwn,
            "You are not authorised to sale this art"
        );
        artMap[tokenId].forSale = false;
        // amount is considered only in ethers
        emit saleCancelEvent(msg.sender, tokenId);
        return true;
    }

    function buyArt(uint256 tokenId) public payable returns (bool) {
        //anyone who transfers the amount
        address tokOwner = ownerOf(tokenId);
        require(
            msg.sender != tokOwner,
            "You are already the owner of this token"
        );
        uint256 val = artMap[tokenId].val;
        require(
            msg.value == val * 1000000000000000000,
            "Please pay as requested"
        );
        (bool sent, bytes memory data) = tokOwner.call{value: msg.value}("");
        require(sent, "Sending failed");

        artMap[tokenId].forSale = false;
        artMap[tokenId].ownersCount = artMap[tokenId].ownersCount + 1;
        _transfer(tokOwner, msg.sender, tokenId);
        emit buyEvent(tokenId, msg.sender, val);
        return true;
    }

    function getArtInfo(uint256 tokenId)
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            uint256,
            uint256,
            bool,
            uint256,
            string memory
        )
    {
        Art memory art = artMap[tokenId];
        return (
            tokenId,
            art.name,
            art.desc,
            art.val,
            art.time,
            art.forSale,
            art.ownersCount,
            art.url
        );
    }
}
