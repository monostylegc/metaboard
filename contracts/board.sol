// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Board is ERC721,Ownable {
    uint public totalSupply = 0;
    uint public maxSupply = 144;

    struct Tile {
        address owner;
        uint8 x;
        uint8 y;
        string imgUrl;
    }

    Tile[] public tiles;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol){
        for(uint8 x;x<12;x++){
            for(uint8 y;y<12;y++){
                tiles.push(Tile(address(0x00),x,y,""));
            }
        }

    }

    function mint(uint256 _id) public payable {
        uint256 supply = totalSupply;

        require(supply <= maxSupply);
        require(tiles[_id].owner == address(0x0));
        require(msg.value >= 1 ether);

        tiles[_id].owner = msg.sender; 
        totalSupply++;
        _safeMint(msg.sender, _id);
    }

     function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        require(_isApprovedOrOwner(_msgSender(),tokenId),
        "ERC721 : transfer caller is not owner nor approved");

        tiles[tokenId].owner = to;
        _transfer(from, to, tokenId);
    }
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public override {
        require(_isApprovedOrOwner(_msgSender(),tokenId),"ERC721 : transfer caller is not owner nor approved");

        tiles[tokenId - 1].owner = to;
        _safeTransfer(from, to, tokenId, _data);
    }

    function getTiles() public view returns(Tile[] memory){
        return tiles;
    }

    function getTile(uint256 _id) public view returns(Tile memory){
        return tiles[_id];
    }

    function setTileImgUrl(uint256 _id, string memory url) public {
        //타일 소유자만 바꿀 수 있게
        require(msg.sender == tiles[_id].owner);

        tiles[_id].imgUrl = url;
    } 
}

