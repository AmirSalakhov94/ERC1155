// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract U1155 is ERC1155 {

    mapping(uint256 => string) internal idToUri;

    constructor() ERC1155("") {
        mint(msg.sender, 1, 1, "https://ipfs.io/ipfs/QmfYuKYibuTtyoW2AVMYB9B3VoJnj7Jrp3ys9kE6MyRu2V?filename=metadataBart1155.json");
    }

    function mint(address _to, uint256 _id, uint256 _amount, string memory _uri) public {
        _mint(_to, _id, _amount, "");
        idToUri[_id] = _uri;
    }

    function uri(uint256 _id) public view virtual override returns (string memory) {
        return idToUri[_id];
    }
}

