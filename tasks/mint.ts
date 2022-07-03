import {task} from "hardhat/config";

task("mint", "Mint")
    .addParam("token", "Token")
    .addParam("to", "Address to")
    .addParam("id", "Token id")
    .addParam("amount", "Amount")
    .addParam("uri", "URI")
    .setAction(async (taskArgs, {ethers}) => {
            console.log("Started")

            const tokenFactory = await ethers.getContractFactory("U1155")
            const token = tokenFactory.attach(taskArgs.token)

            await token.mint(taskArgs.to, taskArgs.id, taskArgs.amount, taskArgs.uri)

            console.log("Finished")
    })
