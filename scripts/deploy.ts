import {ethers} from "hardhat";

async function main() {
    const tokenFactory = await ethers.getContractFactory("U1155");
    const token = await tokenFactory.deploy();
    console.log("Token address:", token.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
