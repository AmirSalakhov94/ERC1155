import {expect} from "chai";
import {ethers} from "hardhat";

describe("Token contract", function () {
    it('Check balance of owner', async () => {
        const [owner] = await ethers.getSigners();
        const tokenFactory = await ethers.getContractFactory("U1155");
        const token = await tokenFactory.deploy();

        const ownerBalance = await token.balanceOf(owner.address, 1);
        expect(ownerBalance).to.equal("1");
    });

    it("Get URI by tokenId", async () => {
        const [owner, acc1] = await ethers.getSigners();
        const tokenFactory = await ethers.getContractFactory("U1155");
        const token = await tokenFactory.deploy();

        const testUri = "testUri";
        await token.mint(acc1.address, 2, 5, testUri);
        expect(await token.uri(2)).to.equal(testUri);
        const acc1Balance = await token.balanceOf(acc1.address, 2);
        expect(acc1Balance).to.equal("5");
    });

    it('Check balance of batch', async () => {
        const [owner, acc1, acc2] = await ethers.getSigners();
        const tokenFactory = await ethers.getContractFactory("U1155");
        const token = await tokenFactory.deploy();

        let testUri = "testUriAcc1";
        await token.mint(acc1.address, 2, 5, testUri);
        expect(await token.uri(2)).to.equal(testUri);

        testUri = "testUriAcc2";
        await token.mint(acc2.address, 3, 10, testUri);
        expect(await token.uri(3)).to.equal(testUri);

        let balanceBatch = await token.balanceOfBatch([owner.address, acc1.address, acc2.address], [1, 2, 3]);
        expect("1").to.equal(balanceBatch[0]);
        expect("5").to.equal(balanceBatch[1]);
        expect("10").to.equal(balanceBatch[2]);
    });

    it("Approved for all", async () => {
        const [owner, acc1] = await ethers.getSigners();
        const tokenFactory = await ethers.getContractFactory("U1155");
        const token = await tokenFactory.deploy();

        await token.setApprovalForAll(acc1.address, true);
        let approved = await token.isApprovedForAll(owner.address, acc1.address);
        expect(true).to.equal(approved);
    });

    it("Safe transfer owner to acc1", async () => {
        const [owner, acc1] = await ethers.getSigners();
        const tokenFactory = await ethers.getContractFactory("U1155");
        const token = await tokenFactory.deploy();

        const ownerTokenId = 1;
        const ownerAmount = 1;
        await token.safeTransferFrom(owner.address, acc1.address, ownerTokenId, ownerAmount, 0x00);
    });

    it("Safe transfer batch owner to acc1", async () => {
        const [owner, acc1] = await ethers.getSigners();
        const tokenFactory = await ethers.getContractFactory("U1155");
        const token = await tokenFactory.deploy();

        let testUri = "ownerTestUri";
        await token.mint(owner.address, 3, 10, testUri);

        const ownerTokenId = 1;
        const ownerAmount = 1;
        const ownerTokenId1 = 3;
        const ownerAmount1 = 10;//как это разруливается, если я укажу амаунт меньше?
        await token.safeBatchTransferFrom(owner.address, acc1.address, [ownerTokenId, ownerTokenId1], [ownerAmount, ownerAmount1], 0x00);
    });
});
